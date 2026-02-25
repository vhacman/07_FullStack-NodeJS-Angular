// questa funzione mi permette di aspettare
// il risultato dei caricamenti
async function testAPI(testname, url, verify, errMsg){
    console.log("Running "+testname);
    // l'esecuzione non va avanti, ma aspetto che risponda
    let response = await fetch(url);    
    // solo la FUNZIONE testAPI si blocca finchÃ© non arriva la risposta
    // sia fetch che json() sono operazioni asincrone, vengono eseguite
    // e non bloccano l'applicazione, invece io voglio che l'applicazione si blocchi
    let json = await response.json();

    if(!verify(json))
        console.log(json, errMsg);
    else
        console.log("PASSED");
}

testAPI
(
    "Api is Up", 
    "http://localhost:3000/carroponte/api/test",
    function(json){return json.message=='Working'},
    "Api not working"
);