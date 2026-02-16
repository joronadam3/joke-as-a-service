#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");

const JOKES_PATH = path.join(__dirname, "jokes.json");
const SCHEMA_PATH = path.join(__dirname, "schema.json");

function loadJSON(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function validate() {
  const isCheck = process.argv.includes("--check");

  console.log("🎭 JaaS Joke Validator\n");

  // Load schema and jokes
  let schema, jokes;
  try {
    schema = loadJSON(SCHEMA_PATH);
    console.log("✅ Schema loaded successfully");
  } catch (err) {
    console.error("❌ Failed to load schema:", err.message);
    process.exit(1);
  }

  try {
    jokes = loadJSON(JOKES_PATH);
    console.log("✅ Jokes JSON is valid");
  } catch (err) {
    console.error("❌ Failed to parse jokes.json:", err.message);
    process.exit(1);
  }

  if (!Array.isArray(jokes)) {
    console.error("❌ jokes.json must be an array");
    process.exit(1);
  }

  console.log(`📊 Total jokes: ${jokes.length}\n`);

  // Initialize Ajv
  const ajv = new Ajv({ allErrors: true });
  const validateJoke = ajv.compile(schema);

  let errors = 0;
  const ids = new Set();
  const duplicateIds = [];
  const categoryCount = {};
  const validCategories = [
    "programming",
    "security",
    "general",
    "dad",
    "pun",
    "dark",
    "workplace",
  ];

  jokes.forEach((joke, index) => {
    // Check for duplicate IDs
    if (ids.has(joke.id)) {
      console.error(`❌ Joke #${index + 1}: Duplicate ID "${joke.id}"`);
      duplicateIds.push(joke.id);
      errors++;
    }
    ids.add(joke.id);

    // Validate against schema
    const valid = validateJoke(joke);
    if (!valid) {
      console.error(
        `❌ Joke #${index + 1} (${joke.id}): Schema validation failed`
      );
      validateJoke.errors.forEach((err) => {
        console.error(`   - ${err.instancePath} ${err.message}`);
      });
      errors++;
    }

    // Count categories
    if (joke.category) {
      categoryCount[joke.category] = (categoryCount[joke.category] || 0) + 1;
    }
  });

  // Check category coverage
  console.log("📁 Category breakdown:");
  validCategories.forEach((cat) => {
    const count = categoryCount[cat] || 0;
    const status = count >= 15 ? "✅" : "⚠️";
    console.log(`   ${status} ${cat}: ${count} jokes`);
    if (count < 15) {
      console.warn(
        `   ⚠️  Category "${cat}" has fewer than 15 jokes (recommended minimum)`
      );
    }
  });

  // Check for unexpected categories
  Object.keys(categoryCount).forEach((cat) => {
    if (!validCategories.includes(cat)) {
      console.error(`❌ Unknown category: "${cat}"`);
      errors++;
    }
  });

  console.log("");

  if (errors > 0) {
    console.error(`\n❌ Validation failed with ${errors} error(s)`);
    process.exit(1);
  }

  console.log("✅ All jokes passed validation!");
  console.log(`📊 ${jokes.length} jokes across ${Object.keys(categoryCount).length} categories`);

  if (isCheck) {
    console.log("\n✅ Check mode: All validations passed");
  }

  process.exit(0);
}

validate();
