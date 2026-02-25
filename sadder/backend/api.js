const express  = require('express');
const Database = require('better-sqlite3');
const cors     = require('cors');

const app = express();
const db  = new Database('sadder.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS people (
        id        INTEGER PRIMARY KEY AUTOINCREMENT,
        name      TEXT    NOT NULL,
        surname   TEXT    NOT NULL,
        birthdate TEXT    NOT NULL,
        x         INTEGER NOT NULL,
        y         INTEGER NOT NULL
    )
`);

app.use(cors());
app.use(express.json());

// ROTTE: PEOPLE

app.get('/carroponte/api/test', (req, res) => {
    try {
        res.json({"status":"active"});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * Recupera tutte le persone presenti nel database.
 *
 * @return Array JSON di oggetti people
 */
app.get('/sadder/api/people', (req, res) =>
{
    try
    {
        const people = db.prepare('SELECT * FROM people').all();
        res.json(people);
    }
    catch (err)
    {
        res.status(500).json({ error: err.message });
    }
});

/**
 * Inserisce una nuova persona nel database.
 *
 * @param name      nome della persona (body)
 * @param surname   cognome della persona (body)
 * @param birthdate data di nascita in formato YYYY-MM-DD (body)
 * @param x         posizione orizzontale su griglia/canvas (body)
 * @param y         posizione verticale su griglia/canvas (body)
 * @return Oggetto JSON con id generato e dati inviati
 */
app.post('/sadder/api/people', (req, res) =>
{
    const { name, surname, birthdate, x, y } = req.body;

    const sql = `
        INSERT INTO people (name, surname, birthdate, x, y)
        VALUES (?, ?, ?, ?, ?)
    `;

    try
    {
        const info = db.prepare(sql).run(name, surname, birthdate, x, y);
        res.status(201).json({ id: info.lastInsertRowid, ...req.body });
    }
    catch (err)
    {
        res.status(400).json({ error: err.message });
    }
});

const PORT = 3000;

app.listen(PORT, () =>
{
    console.log(`Server running on http://localhost:${PORT}`);
});