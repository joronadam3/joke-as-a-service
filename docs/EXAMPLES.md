# Joke-as-a-Service (JaaS) — Usage Examples

Real-world, copy-paste-ready examples for consuming the JaaS API in various languages and tools.

## API Basics

| Detail         | Value                              |
| -------------- | ---------------------------------- |
| Base URL       | `https://jaas.example.com`         |
| Auth           | None required — the API is open    |
| Response type  | `application/json`                 |
| CORS           | Fully open (`*`)                   |
| Rate limit     | 60 requests / minute per IP        |

### Key Endpoints

| Method | Path          | Description              |
| ------ | ------------- | ------------------------ |
| GET    | `/joke`       | Random joke              |
| GET    | `/categories` | List all categories      |
| GET    | `/count`      | Joke counts by category  |
| GET    | `/health`     | Health check             |

### Error Format

All errors return a consistent JSON body:

```json
{
  "error": true,
  "status": 404,
  "message": "Category 'nonexistent' not found. Use GET /categories for a list of valid categories."
}
```

See the [full API documentation](API.md) for complete details.

---

## cURL

### Fetch a random joke

```bash
curl -s https://jaas.example.com/joke | jq .
```

### Filter by category

```bash
curl -s 'https://jaas.example.com/joke?category=programming' | jq .
```

### Handle errors

```bash
response=$(curl -s -w "\n%{http_code}" https://jaas.example.com/joke?category=nonexistent)
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" -ne 200 ]; then
  echo "Error ($http_code): $(echo "$body" | jq -r '.message')"
else
  echo "$body" | jq .
fi
```

---

## JavaScript (fetch)

### Fetch a random joke

```javascript
const response = await fetch("https://jaas.example.com/joke");
const joke = await response.json();

if (joke.type === "single") {
  console.log(joke.joke);
} else {
  console.log(joke.setup);
  console.log(joke.delivery);
}
```

### Filter by category

```javascript
const response = await fetch(
  "https://jaas.example.com/joke?category=programming"
);
const joke = await response.json();
console.log(joke);
```

### Handle errors

```javascript
async function fetchJoke(category) {
  const url = new URL("https://jaas.example.com/joke");
  if (category) {
    url.searchParams.set("category", category);
  }

  const response = await fetch(url);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`JaaS API error (${error.status}): ${error.message}`);
  }

  return response.json();
}

try {
  const joke = await fetchJoke("programming");
  console.log(joke);
} catch (err) {
  console.error(err.message);
}
```

---

## Python (requests)

### Fetch a random joke

```python
import requests

response = requests.get("https://jaas.example.com/joke")
joke = response.json()

if joke["type"] == "single":
    print(joke["joke"])
else:
    print(joke["setup"])
    print(joke["delivery"])
```

### Filter by category

```python
import requests

response = requests.get(
    "https://jaas.example.com/joke",
    params={"category": "programming"},
)
joke = response.json()
print(joke)
```

### Handle errors

```python
import requests

def fetch_joke(category=None):
    params = {}
    if category:
        params["category"] = category

    response = requests.get("https://jaas.example.com/joke", params=params)

    if response.status_code != 200:
        error = response.json()
        raise Exception(f"JaaS API error ({error['status']}): {error['message']}")

    return response.json()

try:
    joke = fetch_joke("programming")
    print(joke)
except Exception as e:
    print(f"Error: {e}")
```

---

## Go (net/http)

### Fetch a random joke

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type Joke struct {
	ID       string `json:"id"`
	Category string `json:"category"`
	Type     string `json:"type"`
	Joke     string `json:"joke,omitempty"`
	Setup    string `json:"setup,omitempty"`
	Delivery string `json:"delivery,omitempty"`
}

func main() {
	resp, err := http.Get("https://jaas.example.com/joke")
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()

	var joke Joke
	if err := json.NewDecoder(resp.Body).Decode(&joke); err != nil {
		log.Fatal(err)
	}

	if joke.Type == "single" {
		fmt.Println(joke.Joke)
	} else {
		fmt.Println(joke.Setup)
		fmt.Println(joke.Delivery)
	}
}
```

### Filter by category

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
)

func main() {
	u, _ := url.Parse("https://jaas.example.com/joke")
	q := u.Query()
	q.Set("category", "programming")
	u.RawQuery = q.Encode()

	resp, err := http.Get(u.String())
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()

	var joke map[string]interface{}
	json.NewDecoder(resp.Body).Decode(&joke)
	fmt.Println(joke)
}
```

### Handle errors

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type APIError struct {
	Error   bool   `json:"error"`
	Status  int    `json:"status"`
	Message string `json:"message"`
}

type Joke struct {
	ID       string `json:"id"`
	Category string `json:"category"`
	Type     string `json:"type"`
	Joke     string `json:"joke,omitempty"`
	Setup    string `json:"setup,omitempty"`
	Delivery string `json:"delivery,omitempty"`
}

func fetchJoke(category string) (*Joke, error) {
	url := "https://jaas.example.com/joke"
	if category != "" {
		url += "?category=" + category
	}

	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		var apiErr APIError
		json.NewDecoder(resp.Body).Decode(&apiErr)
		return nil, fmt.Errorf("JaaS API error (%d): %s", apiErr.Status, apiErr.Message)
	}

	var joke Joke
	if err := json.NewDecoder(resp.Body).Decode(&joke); err != nil {
		return nil, err
	}
	return &joke, nil
}

func main() {
	joke, err := fetchJoke("programming")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%+v\n", joke)
}
```

---

## Rust (reqwest)

> Add to `Cargo.toml`:
> ```toml
> [dependencies]
> reqwest = { version = "0.12", features = ["json"] }
> tokio = { version = "1", features = ["full"] }
> serde = { version = "1", features = ["derive"] }
> serde_json = "1"
> ```

### Fetch a random joke

```rust
use serde::Deserialize;

#[derive(Debug, Deserialize)]
struct Joke {
    id: String,
    category: String,
    #[serde(rename = "type")]
    joke_type: String,
    joke: Option<String>,
    setup: Option<String>,
    delivery: Option<String>,
}

#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    let joke: Joke = reqwest::get("https://jaas.example.com/joke")
        .await?
        .json()
        .await?;

    match (joke.joke, joke.setup, joke.delivery) {
        (Some(text), _, _) => println!("{text}"),
        (_, Some(setup), Some(delivery)) => println!("{setup}\n{delivery}"),
        _ => eprintln!("Unexpected joke format"),
    }
    Ok(())
}
```

### Filter by category

```rust
#[tokio::main]
async fn main() -> Result<(), reqwest::Error> {
    let joke: serde_json::Value = reqwest::Client::new()
        .get("https://jaas.example.com/joke")
        .query(&[("category", "programming")])
        .send()
        .await?
        .json()
        .await?;

    println!("{joke:#}");
    Ok(())
}
```

### Handle errors

```rust
use serde::Deserialize;

#[derive(Debug, Deserialize)]
struct Joke {
    id: String,
    category: String,
    #[serde(rename = "type")]
    joke_type: String,
    joke: Option<String>,
    setup: Option<String>,
    delivery: Option<String>,
}

#[derive(Debug, Deserialize)]
struct ApiError {
    status: u16,
    message: String,
}

async fn fetch_joke(category: Option<&str>) -> Result<Joke, String> {
    let client = reqwest::Client::new();
    let mut request = client.get("https://jaas.example.com/joke");

    if let Some(cat) = category {
        request = request.query(&[("category", cat)]);
    }

    let response = request.send().await.map_err(|e| e.to_string())?;

    if !response.status().is_success() {
        let api_err: ApiError = response.json().await.map_err(|e| e.to_string())?;
        return Err(format!("JaaS API error ({}): {}", api_err.status, api_err.message));
    }

    response.json().await.map_err(|e| e.to_string())
}

#[tokio::main]
async fn main() {
    match fetch_joke(Some("programming")).await {
        Ok(joke) => println!("{joke:?}"),
        Err(e) => eprintln!("Error: {e}"),
    }
}
```

---

## Shell (bash one-liner)

### Fetch a random joke

```bash
curl -s https://jaas.example.com/joke | jq -r 'if .type == "single" then .joke else "\(.setup)\n\(.delivery)" end'
```

### Filter by category

```bash
curl -s 'https://jaas.example.com/joke?category=programming' | jq -r '.joke // "\(.setup)\n\(.delivery)"'
```

### Handle errors

```bash
curl -sf https://jaas.example.com/joke?category=nonexistent | jq . || echo "Request failed (see HTTP status above)"
```

Or with full status checking:

```bash
response=$(curl -s -w '\n%{http_code}' 'https://jaas.example.com/joke?category=programming')
http_code=$(echo "$response" | tail -1)
body=$(echo "$response" | sed '$d')
[ "$http_code" -eq 200 ] && echo "$body" | jq . || echo "$body" | jq -r '.message'
```

---

## PowerShell

### Fetch a random joke

```powershell
$joke = Invoke-RestMethod -Uri "https://jaas.example.com/joke"

if ($joke.type -eq "single") {
    Write-Output $joke.joke
} else {
    Write-Output $joke.setup
    Write-Output $joke.delivery
}
```

### Filter by category

```powershell
$joke = Invoke-RestMethod -Uri "https://jaas.example.com/joke?category=programming"
$joke | ConvertTo-Json
```

### Handle errors

```powershell
try {
    $response = Invoke-WebRequest -Uri "https://jaas.example.com/joke?category=nonexistent" -ErrorAction Stop
    $joke = $response.Content | ConvertFrom-Json
    Write-Output $joke
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    $errorBody = $_.ErrorDetails.Message | ConvertFrom-Json
    Write-Error "JaaS API error ($statusCode): $($errorBody.message)"
}
```
