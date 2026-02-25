# Carroponte — Gestione Spettacoli FullStack

Applicazione full-stack per la gestione di spettacoli teatrali/eventi. Backend Express.js con SQLite, frontend Angular 21 con HttpClient.

## Funzionalità

- **Inserimento spettacolo**: titolo, descrizione, data
- **Lista spettacoli**: recupero di tutti gli spettacoli dal database
- **Dettaglio per ID**: recupero di un singolo spettacolo
- **Persistenza**: dati salvati su database SQLite (`carroponte.db`)

## Architettura

```
carroponte/
├── backend/
│   ├── api.js            # Server Express.js + REST API
│   ├── carroponte.db     # Database SQLite
│   └── package.json
└── frontend/
    └── src/app/
        ├── model/Show.ts          # Interfaccia Show
        ├── show-service.ts        # HttpClient service
        └── form-new-show/         # Componente form inserimento
```

## Backend — REST API

**Base URL**: `http://localhost:3000`

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| `GET` | `/carroponte/api/test` | Health check |
| `GET` | `/carroponte/api/shows` | Lista tutti gli spettacoli |
| `GET` | `/carroponte/api/shows/:id` | Spettacolo per ID |
| `POST` | `/carroponte/api/shows` | Inserisce nuovo spettacolo |

**Schema DB:**
```sql
CREATE TABLE show (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT    NOT NULL,
    description TEXT,
    date        TEXT    NOT NULL
)
```

## Frontend — Angular

**Modello:**
```typescript
interface Show {
    id?:          number;
    title:        string;
    description:  string;
    date:         string;
}
```

**Service (`ShowService`):**
```typescript
insert(show: Show): void  // POST → /carroponte/api/shows
```

**Componenti:**

| Componente | Descrizione |
|------------|-------------|
| `App` | Root component |
| `FormNewShow` | Form con `[(ngModel)]` per inserimento spettacolo, chiama `ShowService.insert()` |

## Concetti chiave

| Concetto | Dettaglio |
|----------|-----------|
| **HttpClient** | Client HTTP Angular per chiamate REST |
| **inject()** | Dependency Injection senza costruttore |
| **subscribe** | Gestione risposta Observable |
| **Spread operator** | `{ id, ...req.body }` nella risposta POST |
| **Destrutturazione** | `const { title, description, date } = req.body` |
| **better-sqlite3** | Accesso sincrono a SQLite (PreparedStatement) |

## Avvio

```bash
# Backend
cd backend
npm install
node api.js

# Frontend (nuovo terminale)
cd frontend
npm install
ng serve
```
