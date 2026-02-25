# SBB V01 — Superior Bed & Breakfast

Applicazione full-stack per la gestione degli ospiti di un B&B. Backend Express.js con SQLite e seed automatico di ~6000 ospiti, frontend Angular 21 con HttpClient.

## Funzionalità

- **Lista ospiti**: visualizzazione degli ultimi 1000 ospiti ordinati per ID DESC
- **Ricerca**: per cognome o codice fiscale (SSN)
- **Aggiunta ospite**: form con campi obbligatori e validazione SSN univoco
- **Eliminazione**: rimozione ospite per ID
- **Seed database**: popolamento automatico con ~6000 anagrafiche italiane realistiche

## Architettura

```
SBB_V01/
├── SBBSuperiorBedAndBreakfastgBackend/
│   ├── server.js         # Express.js REST API
│   ├── seed.js           # Popolamento DB con ~6000 ospiti
│   ├── hotel.db          # Database SQLite (~548KB)
│   └── package.json
└── SBBSuperiorBedAndBreakfastgFrontend/
    └── src/app/
        ├── model/        # Interfaccia Guest
        ├── *-service.ts  # HttpClient service (inject pattern)
        └── components/   # Componenti UI (check-in, search)
```

## Backend — REST API

**Base URL**: `http://localhost:3000`

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| `GET` | `/api/guests` | Lista ospiti (ultimi 1000, DESC per ID) |
| `GET` | `/api/guests/:id` | Ospite per ID |
| `GET` | `/api/guests/bylastname/:lastName` | Cerca per cognome |
| `GET` | `/api/guests/byssn/:ssn` | Cerca per codice fiscale |
| `POST` | `/api/guests` | Crea nuovo ospite |
| `DELETE` | `/api/guests/:id` | Elimina ospite |

**Schema DB:**
```sql
CREATE TABLE guests (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  lastName  TEXT NOT NULL,
  ssn       TEXT UNIQUE NOT NULL,
  dob       TEXT,
  address   TEXT NOT NULL,
  city      TEXT NOT NULL
)
```

## Frontend — Angular

**Modello:**
```typescript
interface Guest {
  id?:        number;
  firstName:  string;
  lastName:   string;
  ssn:        string;
  dob?:       string;
  address:    string;
  city:       string;
}
```

**Componenti:**

| Componente | Descrizione |
|------------|-------------|
| `GuestService` | HttpClient service per le chiamate REST |
| `guest-check-in` | Form inserimento nuovo ospite con `[(ngModel)]` |
| `guest-search` | Ricerca ospiti per cognome o SSN |

## Concetti chiave

| Concetto | Dettaglio |
|----------|-----------|
| **HttpClient** | Client HTTP Angular per chiamate REST |
| **inject()** | Dependency Injection senza costruttore |
| **subscribe** | Gestione risposta Observable |
| **better-sqlite3** | Accesso sincrono a SQLite (PreparedStatement) |
| **CORS** | Abilitato per consentire chiamate cross-origin dal frontend |
| **Seed** | `seed.js` usa i dati di RandomDataGenerator per popolare il DB |

## Avvio

```bash
# Backend
cd SBBSuperiorBedAndBreakfastgBackend
npm install
node server.js          # http://localhost:3000

# Seed database (opzionale, già popolato)
node seed.js

# Frontend (nuovo terminale)
cd SBBSuperiorBedAndBreakfastgFrontend
npm install
ng serve                # http://localhost:4200
```

<div align="center">

**Hacman Viorica Gabriela** | Generation Italy — Java Full Stack Developer

[Backend](SBBSuperiorBedAndBreakfastgBackend/README.md) · [Frontend](SBBSuperiorBedAndBreakfastgFrontend/README.md) · [Torna al README](../README.md)

</div>
