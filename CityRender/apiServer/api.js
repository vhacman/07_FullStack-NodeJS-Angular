// importo express per creare il server e gestire le rotte
const express = require('express');
// importo cors per permettere al frontend (su porta diversa) di fare richieste a questo server
// senza cors il browser blocca le richieste cross-origin per sicurezza
const cors = require('cors');
// importo il dataset dei comuni italiani (array di oggetti con nome e popolazione)
const italianCities = require('../../RandomDataGenerator/dataSetConverter/converter/results/comuniItaliani');

const app = express();
// uso cors() come middleware: viene eseguito su ogni richiesta prima di arrivare alle rotte
app.use(cors());

// calcolo la somma totale delle popolazioni una sola volta all'avvio
// lo faccio fuori dagli endpoint per non ricalcolarlo ad ogni richiesta (ottimizzazione)
// .map() estrae solo il campo popolazione da ogni oggetto
// .reduce() somma tutti i valori in un unico numero
const totalPopulation = italianCities
							.map(city => city.popolazione)
							.reduce((sum, value) => sum + value);

// GET: restituisce una città casuale, con probabilità pesata sulla popolazione
// città più grandi hanno più probabilità di essere estratte
// es. Milano (1.3M abitanti) viene estratta molto più spesso di un piccolo comune
app.get('/api/cities/random', (req, res) => {
	// genero un numero casuale tra 0 e la popolazione totale
	let random = Math.random() * totalPopulation;

	// scorro le città sottraendo la loro popolazione dal numero casuale
	// quando random scende sotto 0 ho trovato la città estratta
	// città con popolazione alta "consumano" più spazio → più probabilità di essere estratte
	for (const city of italianCities) {
		random -= city.popolazione;
		if (random <= 0) return res.json(city);
	}

	// fallback: restituisco l'ultima città nel caso di errori di arrotondamento floating point
	res.json(italianCities[italianCities.length - 1]);
});

// GET: restituisce una città cercandola per nome
// :name è un parametro dinamico nell'URL, accessibile tramite req.params.name
app.get('/api/cities/byname/:name', (req, res) => {
	// .find() restituisce il primo elemento che soddisfa la condizione, o undefined se non trovato
	// uso .toLowerCase() su entrambi i lati per rendere la ricerca case-insensitive
	// così "villasanta", "Villasanta" e "VILLASANTA" danno lo stesso risultato
	const city = italianCities.find(
		c => c.nome.toLowerCase() === req.params.name.toLowerCase()
	);

	// se la città non esiste rispondo con 404 (Not Found) e un messaggio di errore
	if (!city) return res.status(404).json({ error: "City not found" });

	res.json(city);
});

// definisco la porta su cui il server resta in ascolto
// la metto in una variabile così se la cambio la modifico in un posto solo
const PORT = 3001;

// avvio il server: da questo momento è pronto a ricevere richieste HTTP
// la callback viene eseguita una volta sola, quando il server è partito
// uso i template literals (backtick) per inserire la variabile PORT nella stringa
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
