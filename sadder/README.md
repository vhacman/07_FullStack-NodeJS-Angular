# Sadder — Gestione Persone su Canvas FullStack

Applicazione full-stack per la registrazione di persone con coordinate spaziali (x, y) su canvas. Backend Express.js con SQLite, frontend Angular 21 con HttpClient.

## Funzionalità

- **Inserimento persona**: nome, cognome, data di nascita, coordinate x/y
- **Lista persone**: recupero di tutte le persone dal database
- **Persistenza**: dati salvati su database SQLite (`sadder.db`)

## Architettura

```
sadder/
├── backend/
│   ├── api.js         # Server Express.js + REST API
│   ├── sadder.db      # Database SQLite
│   └── package.json
└── frontend/
    └── src/app/
        ├── model/Person.ts        # Interfaccia Person
        ├── person-service.ts      # HttpClient service
        └── form-new-person/       # Componente form inserimento
```

## Backend — REST API

**Base URL**: `http://localhost:3000`

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| `GET` | `/sadder/api/people` | Lista tutte le persone |
| `POST` | `/sadder/api/people` | Inserisce nuova persona |

**Schema DB:**
```sql
CREATE TABLE people (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    name      TEXT    NOT NULL,
    surname   TEXT    NOT NULL,
    birthdate TEXT    NOT NULL,
    x         INTEGER NOT NULL,
    y         INTEGER NOT NULL
)
```

## Frontend — Angular

**Modello:**
```typescript
interface Person {
    id?:       number;
    name:      string;
    surname:   string;
    birthdate: string;
    x:         number;
    y:         number;
}
```

**Service (`PersonService`):**
```typescript
getAll(): Observable<Person[]>   // GET → /sadder/api/people
insert(person: Person): void     // POST → /sadder/api/people
```

**Componenti:**

| Componente | Descrizione |
|------------|-------------|
| `App` | Root component |
| `FormNewPerson` | Form con `[(ngModel)]` per inserimento persona, chiama `PersonService.insert()` |

## Differenza rispetto a Carroponte

| Aspetto | Carroponte | Sadder |
|---------|------------|--------|
| Entità | Show (titolo, data) | Person (dati anagrafici + coordinate) |
| GET list | `ShowService` — solo insert | `PersonService` — `getAll()` con Observable |
| Frontend routing | Base | Base |

## Concetti chiave

| Concetto | Dettaglio |
|----------|-----------|
| **HttpClient** | Client HTTP Angular per chiamate REST |
| **inject()** | Dependency Injection senza costruttore |
| **Observable** | `getAll()` ritorna `Observable<Person[]>` |
| **subscribe** | Gestione risposta asincrona |
| **Two-way Binding** | `[(ngModel)]` su tutti i campi del form |
| **better-sqlite3** | PreparedStatement con parametri `?` |

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
