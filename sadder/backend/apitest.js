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
        "People list",                          // lista persone
        "http://localhost:3000/sadder/api/people",
        "GET",
        "",
        200,
        json=>Array.isArray(json)               // risposta deve essere un array
    ),
    new Test
    (
        "Insert person with missing fields",    // inserimento senza campi obbligatori => 400
        "http://localhost:3000/sadder/api/people",
        "POST",
        {},                                     // body vuoto: tutti i campi NOT NULL mancano
        400
    ),
    new Test
    (
        "Insert person",                        // inserimento valido => 201
        "http://localhost:3000/sadder/api/people",
        "POST",
        { name:"Mario", surname:"Rossi", birthdate:"1990-01-01", x:10, y:20 },
        201,
        json=>json.id>0 && json.name=="Mario"
    )
];

(async () => {
    for(let test of tests)
        await test.run();
})();
