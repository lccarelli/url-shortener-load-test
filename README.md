# 🔗 URL Shortener – Load Testing with K6

Este proyecto contiene pruebas de carga para un servicio de acortador de URLs (`/shorten`) desarrollado en Go, utilizando [Grafana K6](https://k6.io) para simular alto tráfico.

---

## 🗂 Estructura del proyecto

```
url-shortener-load-test/
├── k6-scripts/
│   ├── shortenTest.js       # Test para POST /shorten
├── results/
│   ├── short-keys.txt       # Logs crudos de salida del test de creación
│   └── valid-keys.txt       # Claves extraídas válidas para pruebas GET
├── docker-compose.yml       # Define contenedor de k6
├── Makefile                 # Comandos automatizados
├── README.md                # Documentación
```

---

## ▶️ Cómo usar las pruebas

### 1. Generar 50.000 URLs acortadas

```bash
make load-create
```

Esto ejecuta `shortenTest.js`, haciendo 50k POST a `/shorten`, y guarda la salida con claves en `results/short-keys.txt`.

---

## 🧪 Makefile explicado

```makefile
COMPOSE=docker compose
SCRIPT_DIR=./k6-scripts
RESULTS_DIR=./results
```

### `load-create`
Ejecuta el test `shortenTest.js`, redirige la salida y guarda logs crudos:
```bash
make load-create
```


---

## ✅ Ejemplo de resultado exitoso

```
  ✓ http_req_duration < 2000ms      p(95)=244.56ms
  ✓ http_req_failed < 1%            rate=0.62%
  ✓ 50,000 iteraciones completas    sin errores críticos

  checks_succeeded: 99.37%
  throughput: ~5371 req/s
```

---

## 📦 Requisitos

- Docker
- Docker Compose
- Make
- K6 (se usa dentro de contenedor)

---

## ✨ Consejos

- Asegurate de tener Redis persistente para evitar expiración de claves entre tests.
- Verificá que `valid-keys.txt` tenga 50.000 entradas para máxima cobertura.
- Si querés evitar errores en `make` por umbrales, el target `load-lookup` ya usa `|| true`.

---

¿Querés subir esto a GitHub con un badge de resultados o integrar con K6 Cloud? ¡Podés escalarlo fácilmente!
