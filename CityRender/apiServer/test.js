class Test {
    /*
    *       REQUEST
    *       testname            => nome del test
    *       apiurl              => url della api da testare
    *       verb                => verbo HTTP (GET, POST, ...)
    *       body                => corpo della request (null per GET)
    *
    *       RESPONSE
    *       status              => status code HTTP previsto
    *       verify              => callback di verifica applicata al corpo della response
    */
    constructor(testname, apiurl, verb, body, status, verify) {
        this.testname = testname;
        this.apiurl   = apiurl;
        this.verb     = verb;
        this.body     = body;
        this.status   = status;
        this.verify   = verify;
    }

    async run() {
        console.log("Running " + this.testname);

        let options = {
            method: this.verb,
            headers: { 'Content-Type': 'application/json' }
        };

        // le request GET non hanno body
        if (this.body && this.verb !== 'GET') {
            options.body = JSON.stringify(this.body);
        }

        let response = await fetch(this.apiurl, options);

        if (response.status != this.status) {
            console.log("Status mismatch, expected " + this.status + " got " + response.status);
        } else {
            let json = await response.json();
            if (!this.verify || this.verify(json))
                console.log("PASSED");
            else
                console.log("NOT PASSED", json);
        }
    }
}

let tests = [
    // verifica che /random risponda con 200
    new Test(
        "Random city returns 200",
        "http://localhost:3001/api/cities/random",
        "GET",
        null,
        200,
        // la città deve avere almeno i campi nome e popolazione
        json => json.nome && json.popolazione > 0
    ),

    // verifica che /random restituisca risultati diversi chiamandolo due volte
    // non è deterministico, ma almeno controlliamo che la struttura sia sempre corretta
    new Test(
        "Random city has valid structure",
        "http://localhost:3001/api/cities/random",
        "GET",
        null,
        200,
        json => typeof json.nome === 'string' && typeof json.popolazione === 'number'
    ),

    // verifica che la ricerca per nome funzioni con una città esistente
    new Test(
        "Find city by name - Milano",
        "http://localhost:3001/api/cities/byname/Milano",
        "GET",
        null,
        200,
        json => json.nome === 'Milano'
    ),

    // verifica che la ricerca sia case-insensitive
    new Test(
        "Find city by name - case insensitive",
        "http://localhost:3001/api/cities/byname/milano",
        "GET",
        null,
        200,
        json => json.nome === 'Milano'
    ),

    // verifica che una città inesistente restituisca 404
    new Test(
        "City not found returns 404",
        "http://localhost:3001/api/cities/byname/CittaInesistente",
        "GET",
        null,
        404
    )
];

for (let test of tests)
    await test.run();
