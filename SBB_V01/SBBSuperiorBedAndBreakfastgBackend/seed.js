const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'hotel.db'));

// --- DATI ---

const maleNames = [
  'Luca', 'Marco', 'Alessandro', 'Giuseppe', 'Antonio', 'Francesco', 'Matteo',
  'Lorenzo', 'Andrea', 'Davide', 'Simone', 'Stefano', 'Roberto', 'Riccardo',
  'Fabio', 'Gianluca', 'Claudio', 'Massimo', 'Paolo', 'Michele', 'Giovanni',
  'Nicola', 'Alberto', 'Emanuele', 'Filippo', 'Daniele', 'Federico', 'Gabriele',
  'Leonardo', 'Mattia', 'Tommaso', 'Edoardo', 'Enrico', 'Salvatore', 'Mario',
  'Luigi', 'Bruno', 'Sergio', 'Carlo', 'Cristian'
];

const femaleNames = [
  'Sofia', 'Giulia', 'Chiara', 'Francesca', 'Sara', 'Valentina', 'Alessandra',
  'Laura', 'Silvia', 'Elisa', 'Martina', 'Roberta', 'Monica', 'Paola',
  'Federica', 'Claudia', 'Elena', 'Cristina', 'Serena', 'Giorgia', 'Ilaria',
  'Veronica', 'Alice', 'Beatrice', 'Camilla', 'Emma', 'Viola', 'Aurora',
  'Gaia', 'Noemi', 'Anna', 'Maria', 'Rosa', 'Angela', 'Teresa',
  'Lucia', 'Carla', 'Giovanna', 'Rita', 'Patrizia'
];

const surnames = [
  'Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo',
  'Ricci', 'Marino', 'Greco', 'Bruno', 'Gallo', 'Conti', 'DeLuca',
  'Mancini', 'Costa', 'Giordano', 'Rizzo', 'Lombardi', 'Moretti', 'Barbieri',
  'Fontana', 'Santoro', 'Marini', 'Rinaldi', 'Caruso', 'Ferrara', 'Galli',
  'Martini', 'Leone', 'Longo', 'Gentile', 'Martinelli', 'Vitale', 'Lombardo',
  'Serra', 'Coppola', 'DeSantis', 'DAngelo', 'Marchetti', 'Parisi', 'Villa',
  'Conte', 'Ferretti', 'Cattaneo', 'Ferri', 'Fabbri', 'Bianco', 'Valentini',
  'Palumbo', 'Riva', 'Pellegrini', 'Sanna', 'Messina', 'Sala', 'Sorrentino',
  'Gatti', 'Monti', 'Guerra', 'Pellegrino', 'Neri', 'Mazzoni', 'DeRosa'
];

// Città distribuite su tutte le regioni d'Italia con codice Belfiore
const cities = [
  // Lazio
  { city: 'Roma',             code: 'H501' },
  { city: 'Latina',           code: 'E472' },
  { city: 'Frosinone',        code: 'D810' },
  { city: 'Viterbo',          code: 'M082' },
  // Lombardia
  { city: 'Milano',           code: 'F205' },
  { city: 'Bergamo',          code: 'A794' },
  { city: 'Brescia',          code: 'B157' },
  { city: 'Como',             code: 'C933' },
  { city: 'Varese',           code: 'L682' },
  { city: 'Monza',            code: 'F704' },
  { city: 'Pavia',            code: 'G388' },
  // Campania
  { city: 'Napoli',           code: 'F839' },
  { city: 'Salerno',          code: 'H703' },
  { city: 'Caserta',          code: 'B963' },
  { city: 'Avellino',         code: 'A509' },
  { city: 'Benevento',        code: 'A783' },
  // Piemonte
  { city: 'Torino',           code: 'L219' },
  { city: 'Novara',           code: 'F952' },
  { city: 'Alessandria',      code: 'A182' },
  { city: 'Cuneo',            code: 'D205' },
  { city: 'Asti',             code: 'A479' },
  // Veneto
  { city: 'Venezia',          code: 'L736' },
  { city: 'Verona',           code: 'L781' },
  { city: 'Padova',           code: 'G224' },
  { city: 'Vicenza',          code: 'L840' },
  { city: 'Treviso',          code: 'L407' },
  { city: 'Belluno',          code: 'A757' },
  // Toscana
  { city: 'Firenze',          code: 'D612' },
  { city: 'Pisa',             code: 'G702' },
  { city: 'Siena',            code: 'I726' },
  { city: 'Arezzo',           code: 'A390' },
  { city: 'Livorno',          code: 'E625' },
  { city: 'Lucca',            code: 'E715' },
  { city: 'Prato',            code: 'G999' },
  // Emilia-Romagna
  { city: 'Bologna',          code: 'A944' },
  { city: 'Modena',           code: 'F257' },
  { city: 'Parma',            code: 'G337' },
  { city: 'Ferrara',          code: 'D548' },
  { city: 'Rimini',           code: 'H294' },
  { city: 'Ravenna',          code: 'H199' },
  // Sicilia
  { city: 'Palermo',          code: 'G273' },
  { city: 'Catania',          code: 'C351' },
  { city: 'Messina',          code: 'F158' },
  { city: 'Siracusa',         code: 'I754' },
  { city: 'Trapani',          code: 'L331' },
  { city: 'Agrigento',        code: 'A089' },
  // Puglia
  { city: 'Bari',             code: 'A662' },
  { city: 'Foggia',           code: 'D643' },
  { city: 'Lecce',            code: 'E506' },
  { city: 'Taranto',          code: 'L049' },
  { city: 'Brindisi',         code: 'B180' },
  // Calabria
  { city: 'Reggio Calabria',  code: 'H221' },
  { city: 'Catanzaro',        code: 'C352' },
  { city: 'Cosenza',          code: 'D086' },
  // Sardegna
  { city: 'Cagliari',         code: 'B354' },
  { city: 'Sassari',          code: 'I452' },
  { city: 'Nuoro',            code: 'F979' },
  // Liguria
  { city: 'Genova',           code: 'D969' },
  { city: 'La Spezia',        code: 'E463' },
  { city: 'Savona',           code: 'I480' },
  // Marche
  { city: 'Ancona',           code: 'A271' },
  { city: 'Pesaro',           code: 'G453' },
  { city: 'Macerata',         code: 'E783' },
  // Umbria
  { city: 'Perugia',          code: 'G478' },
  { city: 'Terni',            code: 'L117' },
  // Abruzzo
  { city: 'Pescara',          code: 'G482' },
  { city: "L'Aquila",         code: 'A345' },
  { city: 'Chieti',           code: 'C632' },
  // Friuli-Venezia Giulia
  { city: 'Trieste',          code: 'L424' },
  { city: 'Udine',            code: 'L483' },
  { city: 'Pordenone',        code: 'G888' },
  // Trentino-Alto Adige
  { city: 'Trento',           code: 'L378' },
  { city: 'Bolzano',          code: 'A952' },
  // Basilicata
  { city: 'Potenza',          code: 'G942' },
  { city: 'Matera',           code: 'F052' },
  // Molise
  { city: 'Campobasso',       code: 'B519' },
  // Valle d'Aosta
  { city: "Aosta",            code: 'A326' },
];

const streetTypes = ['Via', 'Corso', 'Viale', 'Piazza', 'Largo', 'Vicolo'];
const streetNames = [
  'Roma', 'Milano', 'Garibaldi', 'Mazzini', 'Cavour', 'Dante', 'Verdi',
  'Leopardi', 'Marconi', 'Gramsci', 'Matteotti', 'Vittorio Emanuele',
  'della Repubblica', 'della Libertà', 'San Giovanni', 'San Marco',
  'Santa Maria', 'del Corso', 'della Stazione', 'Nazionale',
  'Europa', 'Italia', 'della Pace', 'dei Mille', 'Umberto I'
];

// --- CODICE FISCALE ---

const VOWELS = new Set(['A','E','I','O','U']);
const MONTH_CODES = ['A','B','C','D','E','H','L','M','P','R','S','T'];

const ODD_VALUES = {
  '0':1,'1':0,'2':5,'3':7,'4':9,'5':13,'6':15,'7':17,'8':19,'9':21,
  'A':1,'B':0,'C':5,'D':7,'E':9,'F':13,'G':15,'H':17,'I':19,'J':21,
  'K':2,'L':4,'M':18,'N':20,'O':11,'P':3,'Q':6,'R':8,'S':12,'T':14,
  'U':16,'V':10,'W':22,'X':25,'Y':24,'Z':23
};
const EVEN_VALUES = {
  '0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,
  'A':0,'B':1,'C':2,'D':3,'E':4,'F':5,'G':6,'H':7,'I':8,'J':9,
  'K':10,'L':11,'M':12,'N':13,'O':14,'P':15,'Q':16,'R':17,'S':18,'T':19,
  'U':20,'V':21,'W':22,'X':23,'Y':24,'Z':25
};

function extractParts(s) {
  const upper = s.toUpperCase().replace(/[^A-Z]/g, '');
  const consonants = upper.split('').filter(c => !VOWELS.has(c)).join('');
  const vowels    = upper.split('').filter(c =>  VOWELS.has(c)).join('');
  return { consonants, vowels };
}

function surnameCode(lastName) {
  const { consonants, vowels } = extractParts(lastName);
  return (consonants + vowels + 'XXX').substring(0, 3);
}

function firstNameCode(firstName) {
  const { consonants, vowels } = extractParts(firstName);
  if (consonants.length >= 4) return consonants[0] + consonants[2] + consonants[3];
  return (consonants + vowels + 'XXX').substring(0, 3);
}

function checkChar(cf15) {
  let sum = 0;
  for (let i = 0; i < 15; i++) {
    const c = cf15[i].toUpperCase();
    sum += (i % 2 === 0) ? ODD_VALUES[c] : EVEN_VALUES[c];
  }
  return String.fromCharCode(65 + (sum % 26));
}

function buildSSN(firstName, lastName, dob, gender, belfioreCode) {
  const yy    = String(dob.getFullYear()).slice(2);
  const month = MONTH_CODES[dob.getMonth()];
  const dd    = gender === 'M'
    ? String(dob.getDate()).padStart(2, '0')
    : String(dob.getDate() + 40).padStart(2, '0');
  const cf15 = (surnameCode(lastName) + firstNameCode(firstName) + yy + month + dd + belfioreCode).toUpperCase();
  return cf15 + checkChar(cf15);
}

// --- UTILITY ---

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDob() {
  const year  = randInt(new Date().getFullYear() - 60, new Date().getFullYear() - 18);
  const month = randInt(0, 11);
  const day   = randInt(1, 28); // sicuro per tutti i mesi
  return new Date(year, month, day);
}

function formatDate(d) {
  return d.toISOString().split('T')[0];
}

// --- INSERIMENTO ---

const stmt = db.prepare(
  'INSERT INTO guests (firstName, lastName, ssn, dob, address, city) VALUES (?, ?, ?, ?, ?, ?)'
);

let inserted = 0;
let attempts = 0;

while (inserted < 5000 && attempts < 10000) {
  attempts++;

  const gender    = Math.random() < 0.5 ? 'M' : 'F';
  const firstName = gender === 'M' ? pick(maleNames) : pick(femaleNames);
  const lastName  = pick(surnames);
  const dob       = randomDob();
  const cityData  = pick(cities);
  const address   = `${pick(streetTypes)} ${pick(streetNames)}, ${randInt(1, 200)}`;
  const ssn       = buildSSN(firstName, lastName, dob, gender, cityData.code);

  try {
    stmt.run(firstName, lastName, ssn, formatDate(dob), address, cityData.city);
    inserted++;
  } catch (e) {
    // codice fiscale duplicato: saltiamo e riproviamo
  }
}

console.log(`Inseriti ${inserted} guest (${attempts} tentativi).`);
db.close();
