<div align="center">

# SBB Frontend — Superior Bed & Breakfast

Frontend Angular 21 per la gestione ospiti di un B&B, con integrazione REST API.

</div>

---

## Descrizione

Interfaccia web per la gestione degli ospiti di un bed & breakfast. Permette di visualizzare, cercare, aggiungere ed eliminare ospiti comunicando con il backend Express.js.

---

## Funzionalità

- **Lista ospiti**: visualizzazione tabellare con scroll
- **Ricerca**: per cognome e codice fiscale (SSN)
- **Aggiunta ospite**: form con validazione campi obbligatori
- **Eliminazione**: rimozione ospite con conferma

---

## Stack

| Tecnologia | Versione |
|------------|----------|
| **Angular** | 21.1.4 |
| **TypeScript** | 5.x |
| **HttpClient** | Chiamate REST |
| **FormsModule** | Two-way binding |
| **Vitest** | Unit testing |

---

## Avvio

```bash
cd SBBSuperiorBedAndBreakfastgFrontend
npm install
ng serve
```

Frontend disponibile su `http://localhost:4200`

### Prerequisiti

- Backend in esecuzione su `http://localhost:3000`
- Angular CLI installato globalmente (`npm install -g @angular/cli`)

---

## Struttura

```
src/app/
├── model/           # Interfacce TypeScript (Guest)
├── services/        # HttpClient service per API
└── components/      # Componenti UI
```

---

## API Integration

Il frontend comunica con il backend tramite:

| Endpoint | Uso |
|----------|-----|
| `GET /api/guests` | Carica lista ospiti |
| `GET /api/guests/bylastname/:name` | Ricerca per cognome |
| `GET /api/guests/byssn/:ssn` | Ricerca per SSN |
| `POST /api/guests` | Aggiunge nuovo ospite |
| `DELETE /api/guests/:id` | Elimina ospite |

---

## Build

```bash
ng build
```

Output in `dist/` directory.

---

## Testing

```bash
ng test    # Unit tests con Vitest
ng e2e     # End-to-end tests
```

---

<div align="center">

**Hacman Viorica Gabriela** | Generation Italy — Java Full Stack Developer

[Backend Express.js](../SBBSuperiorBedAndBreakfastgBackend/) | [Torna al README](../../README.md)

</div>
