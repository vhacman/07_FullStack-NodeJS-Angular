const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');
const app = express();
const db = new Database('carroponte.db'); // Crea il file del database

// --- INIZIALIZZAZIONE TABELLA SHOW ---
db.exec(`
  CREATE TABLE IF NOT EXISTS show (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    date TEXT NOT NULL       
  )
`);

app.use(cors());
app.use(express.json());

// --- ROTTE API ---

// GET: Recupera il test di funzionamento
app.get('/carroponte/api/test', (req, res) => {
    try {
        res.json({"status":"active"});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: Recupera un singolo show per ID
app.get('/carroponte/api/shows/:id', (req, res) => {
    try {
        const show = db.prepare('SELECT * FROM show WHERE id = ?').get(req.params.id);
        if (!show) return res.status(404).json({ error: "Show not found" });
        res.json(show);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/carroponte/api/shows', (req, res) => {
    try {
        // PreparedStatement
        // righe del db trasformate in json. non ci sono entità
        // non ci sono metodi, ci sono righe già jsonizzate
        const shows = db.prepare('SELECT * FROM show').all();
        console.log(shows);
        // return ResponseEntity.ok(shows);
        res.json(shows);
    } catch (err) {
        // return ResponseEntity.status(500).body(errorMessage);
        res.status(500).json({ error: err.message });
    }
});

// POST: Inserisce un nuovo show
app.post('/carroponte/api/shows', (req, res) => {
    // destrutturazione di un oggetto in Javascript
    // body è l'oggetto json inviato dalla request, prendo i campi title, description e date
    const { title, description, date } = req.body;
    /*
        title = req.body.title;
        description = req.body.description;
        date = req.body.date;
    */
    const sql = `
        INSERT INTO show (title,description,date)
        VALUES (?, ?, ?)
    `;
    
    try {
        const info = db.prepare(sql).run(title, description, date);
        res.status(201).json({ id: info.lastInsertRowid, ...req.body });
        // i ... sono detti spread operator o operatore di copia 
        // sto restituendo un nuovo oggetto che ha come chiave l'id e poi tutte le chiavi della req.body
        // ho copiato la req.body e ho aggiunto l'id
        // {id:2, description:"pippo", title:"pippo", date:2026-02-14}
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Avvio server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});