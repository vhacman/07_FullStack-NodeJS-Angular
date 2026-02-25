class Test {
    /*
    *       REQUEST
    *       api url             => url della api da testare
    *       verb                => verbo della api
    *       body della request  => corpo della request
    *
    *       RESPONSE
    *       status              => codice previsto
    *       verify              => funzione di verifica da applicare al corpo della response
    *                              callback di verifica
    * 
    */
    constructor(testname, apiurl, verb, body, status, verify){
        this.testname = testname;
        this.apiurl = apiurl;
        this.verb = verb;
        this.body = body;
        this.status = status;
        this.verify = verify;
    }    

    // funzione con elementi asincroni
    // in async posso usare await per sincronizzare
    // le operazioni asincrone. letteralmente "ASPETTA"
    // uso await per non usare then()
    async run(){
        console.log("Running "+this.testname);
        let options = {
            method: this.verb,
            headers: { 'Content-Type': 'application/json'}
        };
        // le request get non hanno body
        if (this.body && this.verb !== 'GET') {
            options.body = JSON.stringify(this.body);
        }
        // questo è letteralmente il risultato della fetch
        // è quello che mettiamo nel then ma stiamo aspettando
        // ho reso la fetch BLOCCANTE.
        let response = await fetch(this.apiurl, options);
        if(response.status!=this.status)
            console.log("Status mismatch, expected "+this.status+" got "+response.status);
        else
        {
            let json = await response.json();
            if(!this.verify || this.verify(json))
                console.log("PASSED");
            else
                console.log("NOT PASSED", json);
        }
    }
}

let tests = [
    new Test
    (
        "Api is working", 
        "http://localhost:3000/carroponte/api/test",
        "GET",
        "",
        200,
        json=>json.status=='active'
    ), 
    new Test
    (
        "Shows present", 
        "http://localhost:3000/carroponte/api/shows",
        "GET",
        "",
        200,
        json=>json.length>=1
    ),
    new Test
    (
        "Load show not present", 
        "http://localhost:3000/carroponte/api/shows/100000",
        "GET",
        "",
        404
    ),
    new Test
    (
        "Load show n 1", 
        "http://localhost:3000/carroponte/api/shows/1",
        "GET",
        "",
        200,
        json=>json.description=='Concerto classico'
    ),
    new Test
    (
        "Insert show", 
        "http://localhost:3000/carroponte/api/shows", 
        "POST", 
        {"title":"Concerto di Carlo", "description":"Concerto jazz", "date":"2026-02-14"}, // req.body
        201,
        json=>json.id>0 && json.description=="Concerto jazz"
    )
]; 

for(let test of tests)
    await test.run();