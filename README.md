# 🌦️ WeatherAI Intelligence App

A production-grade backend service that integrates with the WeatherAI API to deliver weather intelligence data. The service resolves location inputs into geographic coordinates using OpenStreetMap’s Nominatim API before querying WeatherAI, ensuring accurate and structured weather data retrieval.

This project is designed with scalability, maintainability, and production-readiness in mind, following clean backend architecture principles.

---

## 🚀 Live API (Deployed)

```
https://weather-intelligence-app-s0nl.onrender.com
```

---

## 📌 Key Features

### 🌍 Location Resolution Layer

* Converts human-readable city names into latitude and longitude
* Uses **OpenStreetMap Nominatim API**
* Ensures WeatherAI receives precise geospatial queries

### 🌦️ Weather Data Integration

* Fetches weather data from WeatherAI API
* Supports structured query-based weather retrieval using coordinates

### 🧠 Clean Service Architecture

* Separation of concerns (controllers, services, utils)
* Modular and extensible design

### 📊 API Documentation

* Fully documented using **Swagger UI**
* Located in `/docs` folder

### 🪵 Logging & Observability

* Integrated **Winston logger**
* Structured logs for debugging and production monitoring

### 🐳 Containerization

* Fully Dockerized for consistent deployment across environments

---

## 🧰 Tech Stack

* Node.js (v24.15.0)
* npm (11.4.2)
* Express.js
* Winston (logging)
* Swagger (API documentation)
* Docker
* Axios (HTTP client)

---

## 📁 Project Structure

```
weather-intelligence-app/
│
├── src/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── utils/
│   ├── configurations/
│   ├── constants/
│   ├── docs/
│   ├── app.js
│   └── server.js
│
├── swagger/               # API documentation
│
├── tests/                 # Unit and integration tests
│
├── Dockerfile
├── package.json
├── README.md
```

---

## ⚙️ API Workflow

### 1. Input: City Name

Client sends:

```
GET /api/weather?city=Douala
```

---

### 2. Geocoding Layer (Nominatim)

City is converted into coordinates:

```
Douala → lat: 4.0511, lon: 9.7679
```

---

### 3. WeatherAI API Request

Coordinates are passed to WeatherAI API:

```
lat + lon → WeatherAI API → Weather Data Response
```

---

### 4. Response Returned

Structured weather data is returned to the client.

---

## 🔌 API Endpoints

### 📍 GET `/api/v1/weather`

Fetch weather data for a given city.

#### Query Parameters:

* `city` (required): Name of the city

#### Example:

```
GET /api/v1/weather?city=Paris
```

#### Response:

```json
{
  "weather": {
    "temperature": 18,
    "condition": "Cloudy",
    "humidity": 72,
    "windSpeed":9.1,
    "rainProbability": 69
  },
  "insights":[
    "High chance of rain - carry an umbrella"
  ]
}
```

---

## 📖 Swagger Documentation

API documentation is available via Swagger:

```
/docs
```

All endpoints, parameters, and responses are documented and testable via the Swagger UI.

---

## 🪵 Logging (Winston)

The system uses structured logging for:

* API requests
* External API calls
* Errors and exceptions
* Debug-level tracing

Logs are categorized by environment (`NODE_ENV`).

---

## 🧪 Testing

Run tests using:

```
npm run test
```

Includes:

* Unit tests
* Service layer tests
* API endpoint validation

---

## 🐳 Docker Setup

### Build Image

```
docker build -t weather-intelligence-app .
```

### Run Container

```
docker run -p 9000:9000 weather-intelligence-app
```

---

## ⚙️ Environment Variables

Create a `.env` file:

```
NODE_ENV=development
PORT=9000
API_PREFIX=/api
weather_api_key=your_weather_ai_api_key
```

---

## 🚀 Available Scripts

### Development

```
npm run dev
```

### Production

```
npm run prod
```

### Start (standard)

```
npm run start
```

### Testing

```
npm run test
```

---

## 🧠 Architectural Decisions

### 1. Separation of Concerns

* Controllers handle HTTP layer
* Services handle business logic
* Utils handle reusable logic (geocoding, formatting)

### 2. External Geocoding Layer

WeatherAI requires coordinates, not city names.
To solve this, OpenStreetMap Nominatim was integrated as a preprocessing layer.

### 3. Observability First

Winston logging ensures production-grade debugging and traceability.

### 4. Containerization

Docker ensures consistency across:

* local development
* CI pipelines
* production deployment

---

## 📈 Future Improvements

* Redis caching for weather responses
* Rate limiting per IP
* Circuit breaker for WeatherAI API failures
* CI/CD pipeline integration (GitHub Actions)
* Request validation middleware (Joi / Zod)

---

## 👨‍💻 Author
* Lac-doh-Wilson Tchofor
* Backend Engineer
* Specialized in scalable APIs, distributed systems, and production backend systems.
