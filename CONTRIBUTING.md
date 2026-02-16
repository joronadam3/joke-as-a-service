# Contributing to Joke-as-a-Service (JaaS) 🎉

Thank you for your interest in contributing to Joke-as-a-Service! Whether you're here to add a hilarious joke, fix a bug, or improve our docs, we appreciate your help. Every contribution makes this project better, and we're glad to have you.

This guide will walk you through everything you need to know to get started. It's designed to be beginner-friendly, so don't worry if this is your first open-source contribution — you're in the right place.

---

## Table of Contents

- [How to Add New Jokes](#how-to-add-new-jokes)
- [Joke Quality Guidelines](#joke-quality-guidelines)
- [Category Guidelines](#category-guidelines)
- [The `safe` Flag Rules](#the-safe-flag-rules)
- [How to Improve Documentation](#how-to-improve-documentation)
- [How to Report Bugs](#how-to-report-bugs)
- [Pull Request Process](#pull-request-process)
- [Code of Conduct](#code-of-conduct)

---

## How to Add New Jokes

Adding jokes is the most common way people contribute to JaaS. Here's how to do it step by step:

1. **Fork the repository** — Click the "Fork" button at the top right of the repo page to create your own copy.

2. **Clone your fork** and create a new branch:
   ```bash
   git clone https://github.com/<your-username>/joke-as-a-service.git
   cd joke-as-a-service
   git checkout -b add-my-joke
   ```

3. **Add your joke(s)** to `jokes/jokes.json`. Each joke must follow this schema:

   ```json
   {
     "id": "uuid-v4",
     "category": "programming|security|general|dad|pun|dark|workplace",
     "type": "single|twopart",
     "joke": "string (for single type)",
     "setup": "string (for twopart type)",
     "delivery": "string (for twopart type)",
     "tags": ["string"],
     "safe": "true or false",
     "contributed_by": "your-github-username"
   }
   ```

   - For **single** jokes, use the `joke` field and omit `setup`/`delivery`.
   - For **twopart** jokes, use the `setup` and `delivery` fields and omit `joke`.
   - You can generate a UUID with `npx uuid` in your terminal, or use an online tool like [uuidgenerator.net](https://www.uuidgenerator.net/).

4. **Validate your changes** to make sure everything is formatted correctly:
   ```bash
   npm run validate
   ```

5. **Commit and push** your changes:
   ```bash
   git add jokes/jokes.json
   git commit -m "Add new joke about <topic>"
   git push origin add-my-joke
   ```

6. **Open a Pull Request** from your fork back to the main repository. Give it a clear title and description.

---

## Joke Quality Guidelines

To keep JaaS fun and welcoming for everyone, please follow these guidelines:

- **Be original.** Jokes must be original or in the public domain. Do not submit copyrighted material or plagiarize from other joke APIs or websites.
- **Be funny.** This sounds obvious, but give your joke a second read before submitting. Would it make someone smile or groan (in a good way)?
- **No hate speech or discrimination.** Jokes that target people based on race, gender, sexuality, religion, disability, or any other protected characteristic will not be accepted.
- **Be technically accurate.** If you're submitting a programming or security joke, make sure the technical premise is correct. Humor is better when it's grounded in truth.

---

## Category Guidelines

Choose the category that best fits your joke:

| Category | Description |
|---|---|
| **programming** | Jokes about coding, developers, languages, bugs, and software engineering life. |
| **security** | Jokes about cybersecurity, hacking, passwords, vulnerabilities, and InfoSec culture. |
| **general** | Everyday humor that doesn't fit neatly into another category. |
| **dad** | Classic dad jokes — wholesome, groan-worthy, and proudly corny. |
| **pun** | Wordplay-driven jokes where the humor comes from double meanings or similar-sounding words. |
| **dark** | Jokes with a darker edge. These should always have the `safe` flag set to `false`. |
| **workplace** | Jokes about office life, meetings, emails, managers, and corporate culture. |

If your joke could fit into more than one category, pick the one that feels most relevant.

---

## The `safe` Flag Rules

Every joke must include a `safe` field set to either `true` or `false`. This allows consumers of the API to filter jokes by audience appropriateness.

- **`true`** — The joke is appropriate for all audiences. It is family-friendly and suitable for use in workplaces, classrooms, and public-facing applications.
- **`false`** — The joke contains adult themes, dark humor, profanity, or content that could be considered offensive or inappropriate for younger audiences.

When in doubt, mark it as `false`. It's always better to err on the side of caution.

---

## How to Improve Documentation

Good documentation helps everyone. If you spot a typo, unclear instructions, or missing information, we'd love your help fixing it.

- Small fixes (typos, grammar) can be submitted directly as a pull request.
- For larger changes (restructuring, new sections), please open an issue first to discuss your ideas.
- Documentation files include this `CONTRIBUTING.md`, the `README.md`, and anything in the `docs/` directory.

---

## How to Report Bugs

Found something broken? Please let us know by [opening an issue](../../issues/new). When reporting a bug, include:

- A clear, descriptive title.
- Steps to reproduce the problem.
- What you expected to happen vs. what actually happened.
- Any relevant error messages or screenshots.

If the repository has issue templates, please use the appropriate one — it helps us respond faster.

---

## Pull Request Process

Here's what to expect after you submit a pull request:

1. **Automated checks** will run to validate your changes (formatting, schema validation, etc.).
2. **A maintainer will review** your PR. This usually happens within a few days, but please be patient — we're all volunteers.
3. You may receive **feedback or change requests**. This is normal and part of the process. We'll work with you to get your contribution merged.
4. Once approved, a maintainer will **merge your PR**. Congratulations, you're officially a contributor! 🎊

A few tips for a smooth review:

- Keep your PR focused. One joke or one fix per PR is ideal.
- Write a clear PR description explaining what you changed and why.
- Make sure `npm run validate` passes before submitting.

---

## Code of Conduct

We are committed to providing a welcoming and inclusive experience for everyone. All contributors are expected to follow our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before participating.

In short: be kind, be respectful, and assume good intentions.

---

Thank you for helping make JaaS better. We can't wait to see what you contribute! 😄
