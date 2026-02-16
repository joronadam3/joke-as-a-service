# 🎭 Joke-as-a-Service (JaaS)

**A free, community-driven REST API that serves random jokes. Because every developer deserves a laugh.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/joronadam3/joke-as-a-service?style=social)](https://github.com/joronadam3/joke-as-a-service/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/joronadam3/joke-as-a-service?style=social)](https://github.com/joronadam3/joke-as-a-service/network/members)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Jokes Count](https://img.shields.io/badge/jokes-150%2B-blue)](jokes/)

---

## ⚡ Quick Start

```bash
curl https://jaas.example.com/joke
```

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "type": "twopart",
  "category": "programming",
  "setup": "Why do programmers prefer dark mode?",
  "delivery": "Because light attracts bugs.",
  "safe": true
}
```

---

## 🤔 Why JaaS?

- 🆓 **Free & open source** — no cost, ever
- 🔑 **No API key required** — just send a request
- 👥 **Community-driven joke collection** — powered by contributors like you
- ⚡ **Lightning fast** — serverless architecture, low latency
- 📂 **Multiple categories** — programming, dad jokes, puns, and more
- 🛡️ **Safe mode** — family-friendly filtering for kid-safe apps

---

## 📡 API Reference

| Endpoint | Description |
| --- | --- |
| `GET /joke` | Random joke from any category |
| `GET /joke?category=programming` | Random joke from a specific category |
| `GET /joke?type=twopart` | Filter by joke type (`single` or `twopart`) |
| `GET /joke?safe=true` | Safe-for-work jokes only |
| `GET /categories` | List all available categories |
| `GET /count` | Joke count statistics |
| `GET /health` | Health check |

> 📖 For full details, query parameters, and response schemas, see the [API Reference](docs/API.md).

---

## 💡 Usage Examples

### JavaScript (fetch)

```javascript
const response = await fetch("https://jaas.example.com/joke?category=programming");
const joke = await response.json();

if (joke.type === "twopart") {
  console.log(joke.setup);
  console.log(joke.delivery);
} else {
  console.log(joke.joke);
}
```

### Python (requests)

```python
import requests

response = requests.get("https://jaas.example.com/joke?category=programming")
joke = response.json()

if joke["type"] == "twopart":
    print(joke["setup"])
    print(joke["delivery"])
else:
    print(joke["joke"])
```

> 🌐 More examples (cURL, Go, Rust, Shell, PowerShell) available in [docs/EXAMPLES.md](docs/EXAMPLES.md).

---

## 📂 Categories

| Emoji | Category | Jokes |
| --- | --- | --- |
| 💻 | Programming | ~25 |
| 🔐 | Security | ~20 |
| 😄 | General | ~20 |
| 👨 | Dad | ~25 |
| 🤦 | Pun | ~20 |
| 🌑 | Dark | ~20 |
| 🏢 | Workplace | ~22 |

---

## 🤝 Contributing

We love contributions — whether it's a new joke, a docs fix, or a whole new integration!

- 🎭 **Add jokes** — submit your best ones via PR *(this is the #1 way to help!)*
- 📝 **Improve docs** — typos, clarifications, new examples
- 🔧 **Build integrations** — Slack bots, CLI tools, browser extensions
- ⭐ **Star the repo** — it helps others discover JaaS

Check out the [Contributing Guide](CONTRIBUTING.md) to get started.

---

## 🌍 Community Integrations

Projects using JaaS will be listed here. Built something with JaaS? Open a PR to add it!

---

## 🏠 Self-Hosting

Want to run your own instance? Check out [JaaS-Backend](#) for the serverless function source code.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
