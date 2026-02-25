/***************************************************************
 * RANDOM CITY GENERATOR (Weighted Random Selection)
 *
 * Seleziona una città casuale con probabilità proporzionale
 * alla popolazione: città più grandi hanno maggiore probabilità
 * di essere estratte.
 *
 * NOTA: la soluzione ottimale con Prefix Sum + Ricerca Binaria
 *       è stata suggerita da Claude (AI di Anthropic) durante lo
 *       sviluppo. L'algoritmo è stato studiato, compreso e
 *       commentato autonomamente.
 *
 * Algoritmo: Prefix Sum + Ricerca Binaria
 * - Setup:           O(n) — calcolato una volta sola all'avvio
 * - Ogni estrazione: O(log n) — invece di O(n) con il loop lineare
 *
 * NOTA: O(n) = "complessità lineare": il tempo cresce proporzionalmente
 *       al numero di elementi. Con 8000 città → fino a 8000 operazioni.
 *
 *       O(log n) = "complessità logaritmica": il tempo cresce molto
 *       più lentamente. log₂(8000) ≈ 13 → solo 13 operazioni!
 *       Questo perché ad ogni passo l'algoritmo dimezza lo spazio
 *       di ricerca invece di scorrere elemento per elemento.
 ***************************************************************/


// importo il dataset dei comuni italiani
// è un array di oggetti { nome: "...", popolazione: ... }
const comuniItaliani = require('../../data_comuni_italiani/comuniItaliani');


/*
 * Classe City: modella una città con nome e popolazione
 *
 * NOTA: uso una classe per dare un nome significativo ai campi.
 *       Avrei potuto usare gli oggetti di comuniItaliani direttamente,
 *       ma così il codice è più leggibile e autodescrittivo.
 *       "name" e "size" sono nomi miei, non dipendo dai nomi del file.
 */
class City
{
	constructor(name, size)
	{
		this.name = name;
		this.size = size; // size = popolazione, usata come "peso"
	}
}


/*
 * Dataset: costruiamo l'array di City a partire dal file esterno
 *
 * .map() trasforma ogni oggetto del file in un oggetto City.
 * Non modifichiamo il file originale, creiamo una nuova struttura.
 *
 * NOTA: questo si chiama "mapping" — mappa ogni elemento di un
 *       array in un altro elemento, producendo un nuovo array
 *       della stessa lunghezza ma con oggetti di tipo diverso.
 */
const cities = comuniItaliani.map(c => new City(c.nome, c.popolazione));


/*
 * PERCHÉ NON USIAMO IL LOOP LINEARE?
 *
 * Il loop lineare funziona così:
 *   random = numero casuale tra 0 e totale
 *   per ogni città: random -= città.size
 *   quando random <= 0 → quella è la città estratta
 *
 * Il problema: nel caso peggiore scorre TUTTE le città.
 * Con 8000 comuni, ogni estrazione può fare fino a 8000 operazioni.
 * Se genero 1.000.000 di persone → 8 miliardi di operazioni.
 *
 * SOLUZIONE: precalcolare il Prefix Sum una volta sola,
 * poi usare la ricerca binaria per trovare la città in O(log n).
 */


/*
 * STEP 1 — Prefix Sum (somma cumulativa) — O(n) calcolato una volta
 *
 * L'idea: costruisco un nuovo array dove ogni posizione i
 * contiene la SOMMA di tutte le popolazioni da 0 fino a i.
 *
 * Esempio con 3 città:
 *
 *   cities:     [ Milano(1.300.000), Monza(50.000), Lecco(40.000) ]
 *
 *   prefixSums: [ 1.300.000,         1.350.000,     1.390.000     ]
 *                  ^                  ^              ^
 *                  solo Milano        Milano+Monza   tutti e tre
 *
 * NOTA: l'ultimo elemento di prefixSums è sempre uguale alla
 *       somma totale di tutte le popolazioni. Lo uso come totale.
 *
 * NOTA: questo array si costruisce UNA VOLTA SOLA all'avvio del
 *       programma, non ad ogni estrazione. Questo è il segreto
 *       dell'ottimizzazione: pago O(n) una volta, risparmio dopo.
 */
const prefixSums = [];
let cumulative = 0;

for (const city of cities)
{
	cumulative += city.size;
	prefixSums.push(cumulative); // aggiungo la somma parziale all'array
}

// l'ultimo elemento è la somma totale: lo uso per generare il numero casuale
const totalSize = prefixSums[prefixSums.length - 1];


/*
 * STEP 2 — Ricerca Binaria — O(log n)
 *
 * OBIETTIVO: trovare il primo indice i tale che prefixSums[i] >= target
 * (non cerco un valore esatto, cerco il primo che "supera" il target)
 *
 * PERCHÉ FUNZIONA SOLO SU ARRAY ORDINATI?
 * Perché il ragionamento si basa sul valore centrale (mid):
 * se prefixSums[mid] è troppo piccolo, so con certezza che TUTTO
 * ciò che sta a sinistra di mid è ancora più piccolo (array ordinato)
 * → posso scartare metà array senza nemmeno guardarla.
 * Su un array non ordinato questo ragionamento non regge.
 * prefixSums è ordinato per costruzione: aggiungiamo sempre
 * popolazioni positive, quindi ogni elemento è >= del precedente.
 *
 * COME FUNZIONA 
 *   parto con l'intervallo [low=0, high=ultimo indice]
 *   ad ogni passo:
 *     - calcolo mid = punto centrale dell'intervallo corrente
 *     - se prefixSums[mid] < target → mid è troppo piccolo,
 *       e tutto ciò che sta a sinistra è ancora più piccolo
 *       → sposto low a mid+1 (escludo mid, è certamente sbagliato)
 *     - se prefixSums[mid] >= target → mid potrebbe già essere
 *       la risposta, oppure c'è qualcosa di valido ancora più a
 *       sinistra → sposto high a mid (tengo mid dentro l'intervallo)
 *   mi fermo quando low == high: l'intervallo ha un solo elemento
 *
 * PERCHÉ high = mid E NON mid-1?
 * Perché mid soddisfa già la condizione (>= target): se lo escludessi
 * con mid-1 potrei perdere la risposta corretta.
 *
 * PERCHÉ low = mid+1 E NON mid?
 * Perché prefixSums[mid] < target: mid è certamente sbagliato,
 * escluderlo è sicuro. Se scrivessi low=mid il loop potrebbe
 * non terminare mai (low e high non si avvicinerebbero mai).
 *
 * ESEMPIO con 3 città, target = 1.320.000:
 *
 *   indici:     [  0           1           2        ]
 *   prefixSums: [ 1.300.000,  1.350.000,  1.390.000 ]
 *
 *   Inizio: low=0, high=2
 *
 *   Iterazione 1:
 *     mid = floor((0+2)/2) = 1
 *     prefixSums[1] = 1.350.000 >= 1.320.000 → high = 1
 *     intervallo ridotto a [low=0, high=1]
 *
 *   Iterazione 2:
 *     mid = floor((0+1)/2) = 0
 *     prefixSums[0] = 1.300.000 < 1.320.000 → low = 0+1 = 1
 *     intervallo ridotto a [low=1, high=1]
 *
 *   low == high == 1 → trovato! → cities[1] = Monza 
 *
 * NOTA: "invariante di ciclo" è un concetto formale di informatica:
 *       è una proprietà che resta vera ad ogni iterazione del loop.
 *       Qui l'invariante è: "la risposta si trova sempre in [low, high]"
 *       Dimostrare che l'invariante regge ad ogni passo dimostra
 *       che l'algoritmo è corretto.
 *
 * @param {number} target - il valore da cercare nel prefixSums
 * @returns {number} indice del primo elemento >= target
 */
function binarySearch(target)
{
	let low  = 0;
	let high = prefixSums.length - 1;

	while (low < high)
	{
		// calcolo mid così per evitare overflow su numeri molto grandi
		const mid = Math.floor((low + high) / 2);

		if (prefixSums[mid] < target)
			low  = mid + 1; // target è nella metà DESTRA, mid escluso
		else
			high = mid;     // target è nella metà SINISTRA, mid incluso
							// (mid incluso perché potrebbe essere la risposta)
	}

	// quando low == high abbiamo trovato l'indice
	return low;
}


/*
 * STEP 3 — Estrazione casuale pesata — O(log n)
 *
 * Combina tutto:
 *   1. genera un numero casuale in [0, totalSize)
 *   2. usa binarySearch per trovare il primo indice
 *      il cui prefixSum è >= random
 *   3. restituisce la città a quell'indice
 *
 * PERCHÉ FUNZIONA?
 * Ogni città "occupa" uno spazio proporzionale alla sua popolazione
 * nell'intervallo [0, totalSize). Milano occupa 1.300.000 unità,
 * Monza 50.000, ecc. Un numero casuale ha più probabilità di cadere
 * nell'intervallo di Milano che in quello di Monza.
 *
 * È come lanciare una freccetta su una riga lunga totalSize:
 * le città più grandi hanno un segmento più lungo → più probabilità.
 */
function randomCity()
{
	const random = Math.random() * totalSize; // numero casuale in [0, totalSize)
	const index  = binarySearch(random);      // trova l'indice con ricerca binaria
	return cities[index];                     // restituisce la città corrispondente
}


console.log(randomCity());
