# RandomDataGenerator

Generatore di dati anagrafici italiani casuali, con output pronto all'uso come INSERT SQL.

---

## Struttura del progetto

```
RandomDataGenerator/
├── dataSetConverter/
│   └── converter/
│       ├── dataset/                      # File sorgente
│       │   ├── listacomuni.txt           # CSV comuni italiani con popolazione (ISTAT)
│       │   ├── nomi.txt                  # CSV nomi italiani con frequenze storiche (ISTAT)
│       │   └── cognomi.txt               # Lista cognomi italiani (uno per riga)
│       ├── results/                      # Moduli JS generati (già inclusi)
│       │   ├── comuniItaliani.js
│       │   ├── nomiItaliani.js
│       │   └── cognomiItaliani.js
│       ├── converterToJS.js              # Converte listacomuni.txt → comuniItaliani.js
│       ├── converterNomiToJS.js          # Converte nomi.txt → nomiItaliani.js
│       └── converterCognomiToJS.js       # Converte cognomi.txt → cognomiItaliani.js
│
└── RandomDataGenerator/
    ├── generateRandomData.js             # Generatore principale
    ├── randomCityGenerator/
    │   └── randomcitygenerator.js        # Prototipo didattico dell'algoritmo
    └── query/                            # Output: file query_N.txt generati
```

---

## Come funziona

### 1. Estrazione casuale pesata

Nomi e città non vengono estratti con probabilità uniforme, ma **proporzionalmente alla loro frequenza reale**:

- i comuni vengono estratti con probabilità proporzionale alla **popolazione**
- i nomi vengono estratti con probabilità proporzionale alla **frequenza storica ISTAT**
- i cognomi vengono estratti con probabilità **uniforme** (nessun dato di frequenza disponibile)

L'algoritmo usa **prefix sums + ricerca binaria** (`O(log n)` per estrazione) calcolati una sola volta all'avvio.

### 2. Output generato

Ogni esecuzione produce un file `query/query_N.txt` con **5999 INSERT SQL** nella forma:

```sql
INSERT INTO Guest (firstname, lastname, dob, city) VALUES ('Luca', 'Colle', '1971-07-09', 'Pozzuolo Martesana');
INSERT INTO Guest (firstname, lastname, dob, city) VALUES ('Martina', 'Scotti', '1976-03-13', 'Siracusa');
```

Il numero progressivo `N` viene determinato contando i file `.txt` già presenti nella cartella `query/`.

### 3. Prototipo didattico

`randomCityGenerator/randomcitygenerator.js` è un file autonomo e ampiamente commentato che mostra passo dopo passo come funziona l'algoritmo di estrazione pesata (prefix sums + ricerca binaria), con esempi numerici e spiegazioni della complessità computazionale.

---

## Utilizzo

### Generare gli INSERT SQL

```bash
cd RandomDataGenerator
node generateRandomData.js
```

### Rigenerare i dataset JS (opzionale)

Necessario solo se si aggiornano i file sorgente in `dataSetConverter/converter/dataset/`.

```bash
cd dataSetConverter/converter
node converterToJS.js          # rigenera comuniItaliani.js
node converterNomiToJS.js      # rigenera nomiItaliani.js
node converterCognomiToJS.js   # rigenera cognomiItaliani.js
```

---

## Requisiti

- Node.js (qualsiasi versione recente)
- Dipendenze: `express`, `better-sqlite3`, `cors` (installabili con `npm install`)
