/***************************************************************
 * TXT → JSON CONVERTER  (cognomi.txt → cognomiItaliani.js)
 *
 * Legge un file di testo con un cognome per riga,
 * filtra le righe vuote e salva il risultato come modulo
 * CommonJS pronto all'uso.
 *
 * A differenza di comuni e nomi, non ci sono dati di frequenza:
 * il file è una lista semplice → output array di stringhe.
 ***************************************************************/
const fs   = require('fs');
const path = require('path');


/*---------------------------------------------------------------
 * Lettura del file sorgente
 *--------------------------------------------------------------*/
const raw   = fs.readFileSync(path.join(__dirname, 'dataset', 'cognomi.txt'), 'utf8');
const righe = raw.split('\n');


/*---------------------------------------------------------------
 * Pipeline di trasformazione: righe → array di stringhe
 *
 * 1. .filter(non vuote)  → rimuove righe vuote o trailing newline
 * 2. .map(trim)          → rimuove spazi e \r residui (Windows line endings)
 *--------------------------------------------------------------*/
const cognomi = righe
    .filter(r => r.trim() !== '')
    .map(r => r.trim());


/*---------------------------------------------------------------
 * Scrittura del file di output
 *--------------------------------------------------------------*/
const resultsDir = path.join(__dirname, 'results');
fs.mkdirSync(resultsDir, { recursive: true });

fs.writeFileSync(
    path.join(resultsDir, 'cognomiItaliani.js'),
    'const cognomiItaliani = ' + JSON.stringify(cognomi, null, 2) + ';\n\nmodule.exports = cognomiItaliani;'
);


/*---------------------------------------------------------------
 * Riepilogo a console
 *--------------------------------------------------------------*/
console.log('Cognomi caricati:', cognomi.length);
