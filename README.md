# 🌦️ WeatherAI Intelligence App

A production-grade backend service that integrates with the WeatherAI API to deliver weather intelligence data. The service resolves city names into geographic coordinates using OpenStreetMap's Nominatim API before querying WeatherAI, ensuring accurate and structured weather data retrieval.

---

## 🚀 Live API

```
https://weather-intelligence-app-s0nl.onrender.com/api/v1/api-docs
```

---

## 📌 Key Features

- **Location Resolution** — Converts city names to coordinates via OpenStreetMap Nominatim
- **Weather Data Integration** — Fetches structured weather data from WeatherAI API
- **AI-Generated Insights** — Returns human-readable weather advisories based on current conditions
- **In-Memory Caching** — 10-minute TTL cache per city to reduce redundant API calls
- **Circuit Breaker** — Opossum-based breaker with fallback for WeatherAI failures
- **Rate Limiting** — Per-IP request throttling via express-rate-limit
- **Swagger Documentation** — Fully documented and testable API via Swagger UI
- **Structured Logging** — Winston logger with environment-aware log levels
- **Containerization** — Fully Dockerized for consistent deployment

---

## 🧰 Tech Stack

- **Runtime:** Node.js v24.15.0
- **Framework:** Express.js
- **HTTP Client:** Axios
- **Circuit Breaker:** Opossum
- **Logging:** Winston
- **Documentation:** Swagger UI
- **Testing:** Vitest + Supertest
- **Containerization:** Docker

---

## 📁 Project Structure

```
weather-intelligence-app/
│
├── src/
│   ├── clients/            # External API clients (WeatherAI, Nominatim)
│   ├── controllers/        # HTTP request handlers
│   ├── services/           # Business logic
│   ├── routes/             # Express route definitions
│   ├── middlewares/        # Rate limiter, request logger
│   ├── utils/              # Cache, insights, circuit breaker, logger
│   ├── configurations/     # App config (env vars)
│   ├── constants/          # URLs, environment labels
│   ├── docs/               # Swagger spec (YAML)
│   ├── app.js              # Express app setup
│   └── server.js           # Entry point
│
├── tests/                  # Unit and integration tests
├── Dockerfile
├── package.json
└── README.md
```

---

## ⚙️ Local Setup

### Prerequisites

- Node.js v24.15.0+
- npm v11+
- A WeatherAI API key

### 1. Clone the repository

```bash
git clone https://github.com/lacdohwilson/weather-intelligence-app.git
cd weather-intelligence-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=9000
API_PREFIX=/api/v1
WEATHER_API_KEY=your_weather_ai_api_key
```

### 4. Start the development server

```bash
npm run dev
```

The API will be available at `http://localhost:9000/api/v1`

---

## 🐳 Docker Setup

### Build the image

```bash
docker build -t weather-intelligence-app .
```

### Run the container

```bash
docker run -p 9000:9000 --env-file .env weather-intelligence-app
```

---

## 🔌 API Endpoints

### GET `/api/v1/weather`

Fetch current weather data and insights for a given city.

#### Query Parameters

| Parameter | Type   | Required | Description          |
|-----------|--------|----------|----------------------|
| `city`    | string | Yes      | Name of the city     |

#### Example Request

```
GET /api/v1/weather?city=Douala
```

#### Example Response

```json
{
  "status": "success",
  "message": "City weather fetched successfully",
  "data": {
    "weather": {
      "city": "Douala",
      "temperature": 21.6,
      "condition": "Moderate Drizzle",
      "humidity": 93,
      "windSpeed": 9.1,
      "rainProbability": 69
    },
    "insights": [
      "High chance of rain - carry an umbrella."
    ]
  }
}
```

#### Error Response

```json
{
  "status": "fail",
  "message": "City not found: xyz"
}
```

---

## 📖 API Documentation

Full Swagger documentation is available at:

```
/api/v1/api-docs
```

All endpoints, parameters, and response schemas are documented and testable via the Swagger UI.

---

## ⚙️ API Workflow

```
Client → GET /api/v1/weather?city=Douala
       → Guard: validate city param
       → Cache check (10-min TTL)
       → Nominatim geocoding → lat/lon
       → WeatherAI API (via circuit breaker)
       → Map response + generate insights
       → Cache result
       → Return to client
```

---

## 🧪 Testing

```bash
npm run test
```

Includes:

- Controller-level integration tests (Supertest)
- Service mock tests (Vitest)
- Circuit breaker and fallback coverage

---

## 🚀 Available Scripts

| Script          | Command          | Description                  |
|-----------------|------------------|------------------------------|
| Development     | `npm run dev`    | Start with hot reload        |
| Production      | `npm run start`  | Start production server      |
| Test            | `npm run test`   | Run test suite               |

---

## 🧠 Architectural Decisions

### 1. Geocoding Preprocessing Layer
WeatherAI requires coordinates, not city names. OpenStreetMap Nominatim was integrated as a preprocessing step to resolve city names to lat/lon before each WeatherAI request.

### 2. Circuit Breaker Pattern
Opossum wraps all WeatherAI calls. If the external service becomes unavailable, the breaker opens and returns fallback data — preventing cascading failures and keeping the API responsive.

### 3. Separation of Concerns
- Controllers handle the HTTP layer only
- Services orchestrate business logic
- Clients handle raw external API communication
- Utils handle reusable cross-cutting concerns

### 4. Observability First
Winston provides structured, environment-aware logging across all layers — requests, external calls, errors, and cache hits — ensuring production-grade traceability.

### 5. Containerization
Docker ensures the app runs identically across local development, CI pipelines, and production deployments.

---

## 👨‍💻 Author

**Lac-doh-Wilson Tchofor**
Backend Engineer — Node.js · Java · Spring Boot
Specialized in scalable APIs, distributed systems, and production backend architecture.