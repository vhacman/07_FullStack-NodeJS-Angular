/***************************************************************
 * CSV → JSON CONVERTER  (nomi.txt → nomiItaliani.js)
 *
 * Legge un file CSV separato da "," con i nomi italiani più
 * comuni (dati ISTAT per anno), aggrega le frequenze su tutti
 * gli anni disponibili e salva il risultato come modulo
 * CommonJS pronto all'uso.
 *
 * Struttura del CSV:
 *   name, rank, year, count, gender, percent
 *
 * Output: array di oggetti { nome, frequenza, genere }
 * dove genere è "m" (maschile) o "f" (femminile).
 *
 * Le frequenze aggregate vengono usate come peso per
 * l'estrazione casuale pesata — stesso principio della
 * popolazione per i comuni.
 ***************************************************************/
const fs   = require('fs');
const path = require('path');


/*---------------------------------------------------------------
 * Lettura del file sorgente
 * Il file usa encoding UTF-8 standard (nomi in maiuscolo ASCII)
 *--------------------------------------------------------------*/
const raw   = fs.readFileSync(path.join(__dirname, 'dataset', 'nomi.txt'), 'utf8');
const righe = raw.split('\n');


/*---------------------------------------------------------------
 * Parsing dell'header
 * La prima riga contiene i nomi delle colonne, separati da ","
 *--------------------------------------------------------------*/
const header = righe[0].split(',');
// header: name(0), rank(1), year(2), count(3), gender(4), percent(5)


/*---------------------------------------------------------------
 * Pipeline di aggregazione: CSV → Map → array di oggetti
 *
 * 1. .slice(1)              → salta la riga di intestazione
 * 2. .filter(non vuote)     → rimuove righe vuote o trailing newline
 * 3. Accumulo in una Map    → chiave "NOME|genere", valore frequenza totale
 * 4. Conversione Map → array di oggetti { nome, frequenza, genere }
 * 5. .filter(freq > 0)      → scarta eventuali record senza conteggio
 *
 * L'aggregazione somma i count su tutti gli anni:
 * un nome che compare spesso nel tempo avrà un peso maggiore.
 *--------------------------------------------------------------*/
const aggregazione = new Map(); // chiave: "NOME|g", valore: frequenza totale

righe
    .slice(1)
    .filter(r => r.trim() !== '')
    .forEach(r =>
    {
        const campi = r.split(',');

        const nome    = campi[0].trim();          // colonna 0 → nome
        const count   = parseInt(campi[3]) || 0;  // colonna 3 → frequenza annuale
        const genere  = campi[4].trim();          // colonna 4 → "m" o "f"

        // salto righe con genere non valido o count zero
        if (!nome || !genere || count === 0) return;

        const chiave = nome + '|' + genere;
        aggregazione.set(chiave, (aggregazione.get(chiave) || 0) + count);
    });


/*---------------------------------------------------------------
 * Conversione Map → array ordinato per frequenza decrescente
 *--------------------------------------------------------------*/
const nomi = Array.from(aggregazione.entries())
    .map(([chiave, frequenza]) =>
    {
        const [nome, genere] = chiave.split('|');
        return { nome, frequenza, genere };
    })
    .filter(n => n.frequenza > 0)
    .sort((a, b) => b.frequenza - a.frequenza);


/*---------------------------------------------------------------
 * Scrittura del file di output
 *
 * Il risultato viene serializzato come modulo CommonJS:
 *   const nomiItaliani = [ ... ];
 *   module.exports = nomiItaliani;
 *
 * JSON.stringify(..., null, 2) produce output leggibile (pretty-print)
 *--------------------------------------------------------------*/
const resultsDir = path.join(__dirname, 'results');
fs.mkdirSync(resultsDir, { recursive: true });

fs.writeFileSync(
    path.join(resultsDir, 'nomiItaliani.js'),
    'const nomiItaliani = ' + JSON.stringify(nomi, null, 2) + ';\n\nmodule.exports = nomiItaliani;'
);


/*---------------------------------------------------------------
 * Riepilogo a console
 *--------------------------------------------------------------*/
const maschili  = nomi.filter(n => n.genere === 'm').length;
const femminili = nomi.filter(n => n.genere === 'f').length;
console.log('Nomi caricati:  ', nomi.length);
console.log('  → maschili:  ', maschili);
console.log('  → femminili: ', femminili);
