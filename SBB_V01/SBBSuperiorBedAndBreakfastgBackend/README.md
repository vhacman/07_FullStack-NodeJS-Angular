<div align="center">

# SBB Backend — Superior Bed & Breakfast

API REST per la gestione ospiti di un B&B, con database SQLite e validazione SSN (codice fiscale).

</div>

---

## Descrizione

Backend Node.js/Express per la gestione degli ospiti di un bed & breakfast. Supporta operazioni CRUD complete con persistenza su database SQLite.

Il database viene popolato con dati anagrafici italiani generati casualmente tramite RandomDataGenerator.

---

## Endpoint API

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| `GET` | `/api/guests` | Lista tutti gli ospiti (ultimi 1000, ordinati per ID DESC) |
| `GET` | `/api/guests/:id` | Dettaglio ospite per ID |
| `GET` | `/api/guests/bylastname/:lastName` | Cerca ospiti per cognome |
| `GET` | `/api/guests/byssn/:ssn` | Cerca ospite per codice fiscale |
| `POST` | `/api/guests` | Crea nuovo ospite |
| `DELETE` | `/api/guests/:id` | Elimina ospite |

### Schema Guest

```typescript
interface Guest {
  id: number;           // Auto-increment
  firstName: string;    // Obbligatorio
  lastName: string;     // Obbligatorio
  ssn: string;          // Codice fiscale, UNIQUE
  dob: string;          // Data di nascita (opzionale)
  address: string;      // Obbligatorio
  city: string;         // Obbligatorio
}
```

### Esempi

```bash
# Lista ospiti
curl http://localhost:3000/api/guests

# Cerca per cognome
curl http://localhost:3000/api/guests/bylastname/Rossi

# Crea nuovo ospite
curl -X POST http://localhost:3000/api/guests \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Mario","lastName":"Rossi","ssn":"RSSMRA80A01H501Z","dob":"1980-01-01","address":"Via Roma 1","city":"Milano"}'

# Elimina ospite
curl -X DELETE http://localhost:3000/api/guests/1
```

---

## Database

Tabella `guests` con 7 campi:

```sql
CREATE TABLE guests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  ssn TEXT UNIQUE NOT NULL,
  dob TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL
)
```

**Seed:** `seed.js` genera ~6000 ospiti con dati italiani realistici usando RandomDataGenerator.

---

## Avvio

```bash
cd SBBSuperiorBedAndBreakfastgBackend
npm install
node server.js
```

Server in ascolto su `http://localhost:3000`

### Seed database (opzionale)

```bash
node seed.js
```

---

## Stack

| Tecnologia | Uso |
|------------|-----|
| **Express.js** | Web framework REST |
| **better-sqlite3** | Database SQLite sincrono |
| **CORS** | Cross-origin requests |

---

## Error Handling

| Codice | Descrizione |
|--------|-------------|
| `200` | Successo |
| `201` | Risorsa creata |
| `400` | Campi mancanti o SSN duplicato |
| `404` | Ospite non trovato |
| `500` | Errore database |

---

<div align="center">

**Hacman Viorica Gabriela** | Generation Italy — Java Full Stack Developer

[Frontend Angular](../SBBSuperiorBedAndBreakfastgFrontend/) | [Torna al README](../../README.md)

</div>
