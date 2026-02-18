/* Backfill multilingual Sanity fields from existing English copy.
 * Uses lib/translations.ts dictionary when available, otherwise falls back to English text.
 */

const fs = require("fs")
const path = require("path")
const { createClient } = require("next-sanity")

const envPath = path.join(__dirname, "..", ".env.local")
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf8").split("\n")
  for (const line of lines) {
    if (!line || line.trim().startsWith("#")) continue
    const [key, ...rest] = line.split("=")
    const value = rest.join("=").trim().replace(/^"|"$/g, "")
    if (key && value && !process.env[key]) process.env[key] = value
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.replace(/"/g, "")
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01"
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_READ_TOKEN

if (!projectId || !token) {
  console.error("Missing Sanity env vars")
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})

const TRANSLATABLE_KEYS = new Set([
  "title",
  "subtitle",
  "description",
  "label",
  "logoText",
  "logoSubtext",
  "footerBlurb",
  "contactAddress",
  "copyrightText",
  "heroTitle",
  "heroSubtitle",
  "headline",
  "subhead",
  "name",
  "body",
  "blueprintTitle",
  "address",
  "visionHeadline",
  "visionQuote",
  "ecosystemHeadline",
])

function loadDictionary() {
  const file = fs.readFileSync(path.join(__dirname, "..", "lib", "translations.ts"), "utf8")
  const marker = "const translations"
  const start = file.indexOf(marker)
  if (start === -1) return {}
  const equals = file.indexOf("=", start)
  if (equals === -1) return {}
  const openBrace = file.indexOf("{", equals)
  if (openBrace === -1) return {}

  let i = openBrace
  let depth = 0
  for (; i < file.length; i++) {
    const ch = file[i]
    if (ch === "{") depth++
    if (ch === "}") {
      depth--
      if (depth === 0) break
    }
  }
  const literal = file.slice(openBrace, i + 1)
  // Evaluate only local source file object literal.
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${literal});`)()
}

const translations = loadDictionary()

function localizedText(english) {
  const text = typeof english === "string" ? english.trim() : ""
  if (!text) return null
  const mapped = translations[text]
  return {
    en: text,
    hi: mapped?.hi || text,
    ur: mapped?.ur || text,
    bn: mapped?.bn || text,
  }
}

function walk(node) {
  if (!node || typeof node !== "object") return false
  let changed = false

  if (Array.isArray(node)) {
    for (const item of node) {
      if (walk(item)) changed = true
    }
    return changed
  }

  for (const key of Object.keys(node)) {
    const value = node[key]
    if (value && typeof value === "object" && walk(value)) changed = true

    if (!TRANSLATABLE_KEYS.has(key)) continue
    if (typeof value !== "string" || !value.trim()) continue

    const i18nKey = `${key}I18n`
    const existing = node[i18nKey]
    if (existing && typeof existing === "object" && existing.en && existing.hi && existing.ur && existing.bn) {
      continue
    }
    const next = localizedText(value)
    if (!next) continue
    node[i18nKey] = { ...(existing || {}), ...next }
    changed = true
  }

  // Also backfill any existing *I18n object from its base field even if base key
  // wasn't listed in TRANSLATABLE_KEYS.
  for (const key of Object.keys(node)) {
    if (!key.endsWith("I18n")) continue
    const baseKey = key.slice(0, -4)
    const baseValue = node[baseKey]
    if (typeof baseValue !== "string" || !baseValue.trim()) continue
    const existing = node[key]
    const next = localizedText(baseValue)
    if (!next) continue
    if (existing && typeof existing === "object" && existing.en && existing.hi && existing.ur && existing.bn) {
      continue
    }
    node[key] = { ...(existing || {}), ...next }
    changed = true
  }

  return changed
}

async function run() {
  const types = ["homePage", "aboutPage", "programPage", "admissionsPage", "pricingPage", "contactPage", "siteSettings"]
  // Include both published and drafts because Studio usually shows draft documents.
  const query = '*[_type in $types]{...}'
  const docs = await client.fetch(query, { types })

  const tx = client.transaction()
  let changedDocs = 0

  for (const doc of docs) {
    const cloned = JSON.parse(JSON.stringify(doc))
    delete cloned._rev
    delete cloned._updatedAt
    delete cloned._createdAt

    if (walk(cloned)) {
      tx.createOrReplace(cloned)
      changedDocs++
    }
  }

  if (!changedDocs) {
    console.log(`No multilingual backfill changes needed. Checked ${docs.length} document(s).`)
    return
  }

  await tx.commit()
  console.log(`Backfilled multilingual fields in ${changedDocs} document(s).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
