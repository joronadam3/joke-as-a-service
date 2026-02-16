# Joke-as-a-Service (JaaS) — API Documentation

## Base URL

```
https://jaas.example.com
```

All endpoints are relative to this base URL.

---

## Authentication

No authentication is required. The API is open and free to use.

---

## CORS Policy

The API supports Cross-Origin Resource Sharing (CORS) with a fully open policy:

```
Access-Control-Allow-Origin: *
```

You can call the API from any domain, including browser-based JavaScript applications.

---

## Rate Limiting

The API enforces a rate limit of **60 requests per minute per IP address**.

Every response includes the following headers so you can track your usage:

| Header                  | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| `X-RateLimit-Limit`     | Maximum number of requests allowed per window (always `60`). |
| `X-RateLimit-Remaining` | Number of requests remaining in the current window.          |
| `X-RateLimit-Reset`     | Unix timestamp (seconds) when the current window resets.     |

**Example response headers:**

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 42
X-RateLimit-Reset: 1717027260
```

If you exceed the limit you will receive a `429 Too Many Requests` response (see [Error Responses](#error-responses)).

---

## Endpoints

### 1. `GET /joke` — Get a Random Joke

Returns a single random joke. Supports optional query parameters to filter results.

#### Query Parameters

| Parameter  | Type     | Required | Description                                                                 |
| ---------- | -------- | -------- | --------------------------------------------------------------------------- |
| `category` | `string` | No       | Filter by joke category (e.g. `programming`, `dad`, `pun`).                |
| `type`     | `string` | No       | Filter by joke type. Accepted values: `single`, `twopart`.                 |
| `safe`     | `boolean`| No       | When `true`, returns only safe-for-work jokes with no offensive content.    |

#### Example Requests

```bash
# Random joke from any category
curl https://jaas.example.com/joke

# Random programming joke
curl https://jaas.example.com/joke?category=programming

# Random two-part joke
curl https://jaas.example.com/joke?type=twopart

# Random safe programming single-liner
curl https://jaas.example.com/joke?category=programming&type=single&safe=true
```

#### Response — Single Type

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "category": "programming",
  "type": "single",
  "joke": "There are only 10 types of people in the world: those who understand binary and those who don't.",
  "tags": ["binary", "classic"],
  "safe": true,
  "contributed_by": "octocat"
}
```

#### Response — Two-Part Type

```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "category": "programming",
  "type": "twopart",
  "setup": "Why do programmers prefer dark mode?",
  "delivery": "Because light attracts bugs.",
  "tags": ["dark-mode", "bugs"],
  "safe": true,
  "contributed_by": null
}
```

> **Note:** `joke` is present only when `type` is `"single"`. `setup` and `delivery` are present only when `type` is `"twopart"`.

---

### 2. `GET /categories` — List All Categories

Returns an array of all available joke categories.

#### Example Request

```bash
curl https://jaas.example.com/categories
```

#### Response

```json
{
  "categories": [
    "programming",
    "dad",
    "pun",
    "knock-knock",
    "general"
  ]
}
```

---

### 3. `GET /count` — Get Joke Counts

Returns the total number of jokes and a breakdown by category.

#### Example Request

```bash
curl https://jaas.example.com/count
```

#### Response

```json
{
  "total": 312,
  "categories": {
    "programming": 87,
    "dad": 64,
    "pun": 53,
    "knock-knock": 41,
    "general": 67
  }
}
```

---

### 4. `GET /health` — Health Check

Returns the current health status of the API. Useful for monitoring and uptime checks.

#### Example Request

```bash
curl https://jaas.example.com/health
```

#### Response

```json
{
  "status": "ok",
  "uptime": 864231,
  "version": "1.0.0"
}
```

---

## Joke Schema Reference

| Field            | Type               | Description                                                      |
| ---------------- | ------------------ | ---------------------------------------------------------------- |
| `id`             | `string` (UUID v4) | Unique identifier for the joke.                                  |
| `category`       | `string`           | The category the joke belongs to.                                |
| `type`           | `string`           | Either `"single"` or `"twopart"`.                                |
| `joke`           | `string`           | The full joke text. Present only when `type` is `"single"`.      |
| `setup`          | `string`           | The setup line. Present only when `type` is `"twopart"`.         |
| `delivery`       | `string`           | The punchline. Present only when `type` is `"twopart"`.          |
| `tags`           | `string[]`         | List of tags describing the joke.                                |
| `safe`           | `boolean`          | `true` if the joke is safe for work, `false` otherwise.          |
| `contributed_by` | `string \| null`   | GitHub username of the contributor, or `null` if not attributed. |

---

## Error Responses

All errors follow a consistent format:

```json
{
  "error": true,
  "status": 400,
  "message": "A human-readable description of what went wrong."
}
```

### HTTP Status Codes

| Status Code | Meaning                 | When It Occurs                                                        |
| ----------- | ----------------------- | --------------------------------------------------------------------- |
| `200`       | OK                      | The request succeeded.                                                |
| `400`       | Bad Request             | Invalid query parameter value (e.g. `?type=invalid`).                 |
| `404`       | Not Found               | The requested category does not exist or no jokes match your filters. |
| `429`       | Too Many Requests       | You have exceeded the rate limit of 60 requests per minute.           |
| `500`       | Internal Server Error   | An unexpected error occurred on the server.                           |

### Error Examples

#### 400 — Bad Request

```bash
curl https://jaas.example.com/joke?type=invalid
```

```json
{
  "error": true,
  "status": 400,
  "message": "Invalid type parameter. Accepted values are 'single' or 'twopart'."
}
```

#### 404 — Not Found

```bash
curl https://jaas.example.com/joke?category=nonexistent
```

```json
{
  "error": true,
  "status": 404,
  "message": "Category 'nonexistent' not found. Use GET /categories for a list of valid categories."
}
```

#### 429 — Too Many Requests

```json
{
  "error": true,
  "status": 429,
  "message": "Rate limit exceeded. Try again in 60 seconds."
}
```

#### 500 — Internal Server Error

```json
{
  "error": true,
  "status": 500,
  "message": "An unexpected error occurred. Please try again later."
}
```

---

## Quick Start

Fetch a random joke in one line:

```bash
curl -s https://jaas.example.com/joke | jq .
```

Fetch a safe dad joke:

```bash
curl -s "https://jaas.example.com/joke?category=dad&safe=true" | jq .
```

Use it in JavaScript:

```javascript
const response = await fetch("https://jaas.example.com/joke?type=single");
const joke = await response.json();
console.log(joke.joke);
```
