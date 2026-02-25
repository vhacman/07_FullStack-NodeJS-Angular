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

    run(){
        console.log("Running "+this.testname);

        let options = {
            method: this.verb,
            headers: { 'Content-Type': 'application/json'}
        };

        // le request get non hanno body
        if (this.body && this.verb !== 'GET') {
            options.body = JSON.stringify(this.body);
        }

        fetch(this.apiurl, options)
        .then(response=>
        {
            if(response.status!=this.status)
                throw new Error("Status mismatch, expected "+this.status+" got "+response.status)
            return response.json();
        })
        .then(json=>
        {
            // se non ho passato una callback di verifica o se passa la verifica
            if(!this.verify || this.verify(json))
                console.log("PASSED");
            else
                console.log("function not passed", json);
        })
        .catch(err=>
        {
            console.log("NOT PASSED", err);
        });
    }
}

let test1 = new Test
(
    "Api is working", 
    "http://localhost:3000/carroponte/api/test",
    "GET",
    "",
    200,
    json=>json.status=='active'
); 

test1.run();

// secondo test
// caricare tutti gli eventi
// verificare che lunghezza del json
// json.length>=1
let test2 = new Test
(
    "Load all events",
    "http://localhost:3000/carroponte/api/show",
    "GET",
    "",
    200,
    json=>json.length>=1
);

test2.run();