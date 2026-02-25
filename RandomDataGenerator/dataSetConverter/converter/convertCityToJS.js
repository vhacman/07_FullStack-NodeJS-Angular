/***************************************************************
 * CSV → JSON CONVERTER  (listacomuni.txt → comuniItaliani.js)
 *
 * PROGETTO "GEHENNA" — CHALLENGE MODE
 *
 * Questo file è stato realizzato come parte di una sfida
 * a questo proposito l'uso e il supporto di AI, oltre che di altre
 * risorse online, è ovvio, a scopo didattico.
 * Il formato del CSV (separatore ";", encoding latin1, struttura
 * delle colonne) è stato ricavato dalla documentazione del sito
 * da cui è stata scaricata la lista dei comuni italiani.
 *
 * -------------------------------------------------------------
 *
 * Legge un file CSV separato da ";" con encoding Windows (latin1),
 * estrae nome e popolazione di ogni comune italiano,
 * filtra i record incompleti e salva il risultato come
 * modulo CommonJS pronto all'uso.
 ***************************************************************/
const fs   = require('fs');
const path = require('path');


/*---------------------------------------------------------------
 * Lettura del file sorgente
 * L'encoding "latin1" è necessario per i caratteri accentati
 * nei nomi dei comuni (formato tipico dei CSV ISTAT/Windows)
 *--------------------------------------------------------------*/
const raw   = fs.readFileSync(path.join(__dirname, 'dataset', 'listacomuni.txt'), 'latin1');
const righe = raw.split('\n');


/*---------------------------------------------------------------
 * Parsing dell'header
 * La prima riga contiene i nomi delle colonne, separati da ";"
 * Viene salvata per riferimento, anche se non usata nel mapping
 *--------------------------------------------------------------*/
const header = righe[0].split(';');


/*---------------------------------------------------------------
 * Pipeline di trasformazione: CSV → array di oggetti
 *
 * 1. .slice(1)              → salta la riga di intestazione
 * 2. .filter(non vuote)     → rimuove righe vuote o trailing newline
 * 3. .map()                 → converte ogni riga in oggetto { nome, popolazione }
 * 4. .filter(pop > 0)       → scarta comuni privi di dato sulla popolazione
 *--------------------------------------------------------------*/
const comuni = righe
    .slice(1)
    .filter(r => r.trim() !== '')
    .map(r =>
    {
        const campi = r.split(';');

        return {
            nome:        campi[1].trim(),        // colonna 1 → nome del comune
            popolazione: parseInt(campi[7]) || 0  // colonna 7 → popolazione (0 se non parsabile)
        };
    })
    .filter(c => c.popolazione > 0);


/*---------------------------------------------------------------
 * Scrittura del file di output
 *
 * Il risultato viene serializzato come modulo CommonJS:
 *   const comuniItaliani = [ ... ];
 *   module.exports = comuniItaliani;
 *
 * JSON.stringify(..., null, 2) produce output leggibile (pretty-print)
 *--------------------------------------------------------------*/
const resultsDir = path.join(__dirname, 'results');
fs.mkdirSync(resultsDir, { recursive: true });

fs.writeFileSync(
    path.join(resultsDir, 'comuniItaliani.js'),
    'const comuniItaliani = ' + JSON.stringify(comuni, null, 2) + ';\n\nmodule.exports = comuniItaliani;'
);

console.log('Comuni caricati:', comuni.length);