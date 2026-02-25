<div align="center">

# CityRender

API REST per l'estrazione casuale di città italiane, con probabilità pesata sulla popolazione.

</div>

---

## Descrizione

Microservizio che espone endpoint per ottenere città italiane casuali. L'estrazione non è uniforme ma **proporzionale alla popolazione**: città più grandi hanno maggiore probabilità di essere estratte.

Utilizza il dataset di comuni italiani generato da RandomDataGenerator.

---

## Endpoint API

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| `GET` | `/api/cities/random` | Restituisce una città casuale (pesata su popolazione) |
| `GET` | `/api/cities/byname/:name` | Cerca una città per nome (case-insensitive) |

### Esempi

```bash
# Città casuale
curl http://localhost:3001/api/cities/random
# Response: { "nome": "Milano", "popolazione": 1352000 }

# Cerca per nome
curl http://localhost:3001/api/cities/byname/roma
# Response: { "nome": "Roma", "popolazione": 2873000 }
```

---

## Algoritmo di estrazione

L'algoritmo usa la tecnica delle **prefix sums**:

1. Calcolo totale popolazione: ~60 milioni
2. Genero numero casuale tra 0 e totale
3. Sottraggo popolazioni finché non arrivo a 0
4. Città con più abitanti "consumano" più spazio → più probabilità

**Complessità:** O(n) per estrazione (dove n = numero comuni)

Per un'implementazione ottimizzata O(log n), vedere `RandomDataGenerator/randomCityGenerator/`.

---

## Avvio

```bash
cd CityRender/apiServer
npm install
node api.js
```

Server in ascolto su `http://localhost:3001`

---

## Stack

| Tecnologia | Uso |
|------------|-----|
| **Express.js** | Web framework |
| **CORS** | Cross-origin requests |
| **comuniItaliani.js** | Dataset (~8000 comuni) |

---

## Dipendenze

- Dataset: `../RandomDataGenerator/dataSetConverter/converter/results/comuniItaliani.js`

---

<div align="center">

**Hacman Viorica Gabriela** | Generation Italy — Java Full Stack Developer

[Torna al README](../README.md)

</div>
