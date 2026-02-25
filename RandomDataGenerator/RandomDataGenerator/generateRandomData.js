// genera persone casuali e produce INSERT SQL pronti all'uso

const comuniItaliani  = require('../dataSetConverter/converter/results/comuniItaliani');
const nomiItaliani    = require('../dataSetConverter/converter/results/nomiItaliani');
const cognomiItaliani = require('../dataSetConverter/converter/results/cognomiItaliani');


// costruisce i prefix sums per l'estrazione pesata
// ogni elemento i è la somma cumulativa dei pesi da 0 a i
// lo calcolo una volta sola all'avvio così ogni estrazione costa O(log n) invece di O(n)
function buildPrefixSums(array, weightFn)
{
	const sums = [];
	let cumulative = 0;
	for (const item of array)
	{
		cumulative += weightFn(item);
		sums.push(cumulative);
	}
	return sums;
}

const cityPrefixSums = buildPrefixSums(comuniItaliani, c => c.popolazione);
const namePrefixSums = buildPrefixSums(nomiItaliani,   n => n.frequenza);

const totalPopulation = cityPrefixSums[cityPrefixSums.length - 1];
const totalFrequency  = namePrefixSums[namePrefixSums.length - 1];


// ricerca binaria sui prefix sums: trova il primo indice con valore >= target
// funziona solo perché i prefix sums sono ordinati per costruzione
// high = mid (non mid-1) perché mid potrebbe già essere la risposta
// low = mid+1 perché se sums[mid] < target, mid è sbagliato con certezza
function binarySearch(sums, target)
{
	let low  = 0;
	let high = sums.length - 1;

	while (low < high)
	{
		const mid = Math.floor((low + high) / 2);

		if (sums[mid] < target)
			low  = mid + 1;
		else
			high = mid;
	}

	return low;
}


// i nomi nel dataset sono in MAIUSCOLO, li porto in Title Case
// "ANNA MARIA" → "Anna Maria"
function toTitleCase(str)
{
	return str
		.toLowerCase()
		.replace(/\b\w/g, c => c.toUpperCase());
}


const generator =
{
	randomYear:  () => 1950 + Math.floor(Math.random() * 56),
	randomMonth: () => 1    + Math.floor(Math.random() * 12),
	randomDay:   () => 1    + Math.floor(Math.random() * 28), // max 28 per evitare date invalide

	// estrae un elemento a caso dall'array (probabilità uniforme)
	randomElement: (array) =>
	{
		return array[Math.floor(Math.random() * array.length)];
	},

	// data in formato SQL con padding (es. 5 → "05")
	randomDate: () =>
	{
		let day   = generator.randomDay();
		let month = generator.randomMonth();
		let year  = generator.randomYear();

		month = month < 10 ? "0" + month : month;
		day   = day   < 10 ? "0" + day   : day;

		return year + "-" + month + "-" + day;
	},

	// città estratta con probabilità proporzionale alla popolazione
	randomCity: () =>
	{
		const index = binarySearch(cityPrefixSums, Math.random() * totalPopulation);
		return comuniItaliani[index].nome;
	},

	// nome estratto con probabilità proporzionale alla frequenza storica
	randomName: () =>
	{
		const index = binarySearch(namePrefixSums, Math.random() * totalFrequency);
		return toTitleCase(nomiItaliani[index].nome);
	},

	randomPerson: () =>
	{
		return {
			"firstName" : generator.randomName(),
			"lastName"  : toTitleCase(generator.randomElement(cognomiItaliani)),
			"dob"       : generator.randomDate(),
			"city"      : generator.randomCity()
		};
	},

	toInsert: (person) =>
		`INSERT INTO Guest (firstname, lastname, dob, city) ` +
		`VALUES ('${person.firstName}', '${person.lastName}', '${person.dob}', '${person.city}');`,

	randomInsert: () => generator.toInsert(generator.randomPerson())
};


const fs   = require('fs');
const path = require('path');

const lines = [];
for (let i = 1; i < 1000; i++)
	lines.push(generator.randomInsert());

// crea la cartella query se non esiste
const queryDir = path.join(__dirname, 'query');
fs.mkdirSync(queryDir, { recursive: true });

// per trovare il numero progressivo conto quanti .txt ci sono già nella cartella:
// se ci sono 3 file il prossimo sarà query_4.txt
// readdirSync legge i nomi dei file, filter tiene solo i .txt
const existing = fs.readdirSync(queryDir).filter(f => f.endsWith('.txt'));
const nextNum  = existing.length + 1;

const filePath = path.join(queryDir, `query_${nextNum}.txt`);
fs.writeFileSync(filePath, lines.join('\n'));
console.log(`File ${filePath} generato con ${lines.length} INSERT.`);
