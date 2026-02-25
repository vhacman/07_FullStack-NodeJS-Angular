<div align="center">

# 08 — FullStack JS + Angular

Applicazioni full-stack con backend **Node.js / Express.js** + **SQLite** e frontend **Angular 21**.

</div>

---

## Progetti

| Progetto | Descrizione | Stack |
|----------|-------------|-------|
| [Carroponte](carroponte/) | Gestione spettacoli teatrali/eventi | Express.js, SQLite, Angular, HttpClient |
| [Sadder](sadder/) | Gestione persone con coordinate canvas | Express.js, SQLite, Angular, Observable |
| [SBB V01](SBB_V01/) | Gestione ospiti B&B — CRUD completo con seed | Express.js, SQLite, Angular, CRUD |
| [SBB V02](SBB_V02/) | B&B evoluto — prenotazioni, stanze, utenti, routing | Angular, HttpClient, Router, entità multiple |
| [CityRender](CityRender/) | API città italiane (pesate su popolazione) | Express.js, CORS |
| [RandomDataGenerator](RandomDataGenerator/) | Generatore dati anagrafici italiani | Node.js, algoritmi pesati |

---

## Architettura comune

```
progetto/
├── backend/
│   ├── api.js / server.js   # Express.js REST API
│   ├── *.db                 # Database SQLite (better-sqlite3)
│   └── package.json
└── frontend/
    └── src/app/
        ├── model/           # Interfacce TypeScript
        ├── *-service        # HttpClient service (inject pattern)
        └── form-*/          # Componenti form con ngModel
```

---

## Dettagli Progetti

### Carroponte — Gestione Spettacoli

| | |
|---|---|
| **Backend** | Express.js + better-sqlite3 + SQLite |
| **Frontend** | Angular 21 + HttpClient |
| **Entità** | `Show` (title, description, date) |
| **API** | `GET /carroponte/api/shows`, `GET /carroponte/api/shows/:id`, `POST /carroponte/api/shows` |
| **Dettagli** | [README](carroponte/README.md) |

---

### Sadder — Gestione Persone su Canvas

| | |
|---|---|
| **Backend** | Express.js + better-sqlite3 + SQLite |
| **Frontend** | Angular 21 + HttpClient |
| **Entità** | `Person` (name, surname, birthdate, x, y) |
| **API** | `GET /sadder/api/people`, `POST /sadder/api/people` |
| **Dettagli** | [README](sadder/README.md) |

---

### SBB V01 — Superior Bed & Breakfast (versione base)

Full-stack completo per gestione ospiti B&B.

| | |
|---|---|
| **Backend** | Express.js + better-sqlite3 + SQLite |
| **Frontend** | Angular 21 + HttpClient + FormsModule |
| **Entità** | `Guest` (firstName, lastName, ssn, dob, address, city) |
| **API** | CRUD completo: `GET`, `POST`, `DELETE /api/guests` |
| **Seed** | Generazione automatica ~6000 ospiti italiani |
| **Dettagli** | [README](SBB_V01/README.md) · [Backend](SBB_V01/SBBSuperiorBedAndBreakfastgBackend/) · [Frontend](SBB_V01/SBBSuperiorBedAndBreakfastgFrontend/) |

---

### SBB V02 — Superior Bed & Breakfast (versione evoluta)

Frontend Angular evoluto con modello dati esteso, routing e componenti aggiuntivi.

| | |
|---|---|
| **Frontend** | Angular 21 + HttpClient + Router |
| **Entità** | `Guest`, `Room`, `Booking`, `Hotel`, `User` |
| **Servizi** | GuestService, RoomService, BookingService, CityService, UserService |
| **Route** | `/arrivals` → TodayArrivals, `/refund` → RefundCalculator |
| **Componenti** | GuestSearch, GuestPreview, GuestPicker, CityInput, TopMenu, TodayArrivals, RefundCalculator |
| **Dettagli** | [README](SBB_V02/README.md) |

---

### CityRender — API Città Italiane

| | |
|---|---|
| **Tipo** | Microservizio REST |
| **Funzione** | Estrazione città casuali pesate su popolazione |
| **API** | `GET /api/cities/random`, `GET /api/cities/byname/:name` |
| **Dettagli** | [README](CityRender/README.md) |

---

### RandomDataGenerator — Dataset Generator

| | |
|---|---|
| **Funzione** | Genera dati anagrafici italiani casuali |
| **Output** | INSERT SQL per database |
| **Dataset** | ~8000 comuni, nomi e cognomi italiani |
| **Algoritmo** | Prefix sums + binary search O(log n) |
| **Dettagli** | [README](RandomDataGenerator/README.md) |

---

## Stack Tecnologico

| Layer | Tecnologie |
|-------|------------|
| **Backend** | Node.js, Express.js, better-sqlite3 |
| **Database** | SQLite 3 |
| **Frontend** | Angular 21, TypeScript 5.9, HttpClient |
| **Pattern** | Dependency Injection (`inject()`), Service, Observable/subscribe |
| **Binding** | Two-way (`[(ngModel)]`), FormsModule |

---

## Concetti chiave

- **HttpClient**: chiamate HTTP dal frontend verso il backend Express
- **inject()**: pattern Angular per la Dependency Injection senza costruttore
- **Observable / subscribe**: gestione asincrona delle risposte HTTP
- **Spread operator** (`...`): costruzione oggetti risposta nel backend
- **better-sqlite3**: accesso sincrono a SQLite nel backend Node.js
- **Weighted Random**: estrazione pesata su popolazione/frequenza

---

<div align="center">

**Hacman Viorica Gabriela** | Generation Italy — Java Full Stack Developer

[Torna al README principale](../README.md)

</div>
