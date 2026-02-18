/* Fill multilingual fields for all CMS page documents section-by-section. */

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

const client = createClient({ projectId, dataset, apiVersion, useCdn: false, token })

function loadDictionary() {
  const file = fs.readFileSync(path.join(__dirname, "..", "lib", "translations.ts"), "utf8")
  const marker = "const translations"
  const start = file.indexOf(marker)
  if (start === -1) return {}
  const equals = file.indexOf("=", start)
  const openBrace = file.indexOf("{", equals)
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
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${literal});`)()
}

const translations = loadDictionary()

function toI18n(text) {
  if (typeof text !== "string" || !text.trim()) return null
  const en = text.trim()
  const mapped = translations[en]
  return { en, hi: mapped?.hi || en, ur: mapped?.ur || en, bn: mapped?.bn || en }
}

function fillField(target, key) {
  if (!target || typeof target !== "object") return false
  const base = target[key]
  const next = toI18n(base)
  if (!next) return false

  const i18nKey = `${key}I18n`
  const current = target[i18nKey] || {}
  if (current.en && current.hi && current.ur && current.bn) return false

  target[i18nKey] = { ...current, ...next }
  return true
}

function fillArrayItems(doc, arrayKey, keys) {
  const arr = doc[arrayKey]
  if (!Array.isArray(arr)) return 0
  let changes = 0
  for (const item of arr) {
    if (!item || typeof item !== "object") continue
    for (const key of keys) {
      if (fillField(item, key)) changes++
    }
  }
  return changes
}

function fillBySchema(doc) {
  let changes = 0
  const type = doc._type

  if (type === "siteSettings") {
    ;["logoText", "logoSubtext", "footerBlurb", "contactAddress", "copyrightText"].forEach((k) => {
      if (fillField(doc, k)) changes++
    })
    changes += fillArrayItems(doc, "navLinks", ["label"])
    changes += fillArrayItems(doc, "quickLinks", ["label"])
    changes += fillArrayItems(doc, "programLinks", ["label"])
    if (doc.navCta && fillField(doc.navCta, "label")) changes++
  }

  if (type === "homePage") {
    ;["visionHeadline", "visionQuote", "ecosystemHeadline"].forEach((k) => {
      if (fillField(doc, k)) changes++
    })
    changes += fillArrayItems(doc, "slides", ["title", "subtitle", "description"])
    if (Array.isArray(doc.slides)) {
      for (const s of doc.slides) {
        if (s?.primaryCta && fillField(s.primaryCta, "label")) changes++
        if (s?.secondaryCta && fillField(s.secondaryCta, "label")) changes++
      }
    }
    changes += fillArrayItems(doc, "visionCards", ["title", "description"])
    changes += fillArrayItems(doc, "principles", ["title", "description"])
    changes += fillArrayItems(doc, "ecosystemBullets", ["title", "description"])
    changes += fillArrayItems(doc, "executionSteps", ["title", "description"])
    changes += fillArrayItems(doc, "assessmentCards", ["title", "description"])
    changes += fillArrayItems(doc, "stats", ["label"])
  }

  if (type === "aboutPage") {
    ;["heroTitle", "heroSubtitle", "blueprintTitle"].forEach((k) => {
      if (fillField(doc, k)) changes++
    })
    changes += fillArrayItems(doc, "blueprintCards", ["title", "body"])
    changes += fillArrayItems(doc, "movements", ["title", "description"])
  }

  if (type === "programPage") {
    ;["heroTitle", "heroSubtitle"].forEach((k) => {
      if (fillField(doc, k)) changes++
    })
    changes += fillArrayItems(doc, "programs", ["title", "description"])
  }

  if (type === "admissionsPage") {
    ;["heroTitle", "heroSubtitle"].forEach((k) => {
      if (fillField(doc, k)) changes++
    })
    changes += fillArrayItems(doc, "steps", ["title", "description"])
  }

  if (type === "pricingPage") {
    ;["heroTitle", "heroSubtitle"].forEach((k) => {
      if (fillField(doc, k)) changes++
    })
    changes += fillArrayItems(doc, "plans", ["name"])
  }

  if (type === "contactPage") {
    ;["headline", "subhead", "address"].forEach((k) => {
      if (fillField(doc, k)) changes++
    })
  }

  // Safety net: for any *I18n field already present in schema, fill from base key.
  for (const key of Object.keys(doc)) {
    if (!key.endsWith("I18n")) continue
    const baseKey = key.slice(0, -4)
    const baseValue = doc[baseKey]
    if (typeof baseValue !== "string") continue
    const next = toI18n(baseValue)
    if (!next) continue
    const current = doc[key] || {}
    if (current.en && current.hi && current.ur && current.bn) continue
    doc[key] = { ...current, ...next }
    changes++
  }

  return changes
}

async function run() {
  const types = [
    "siteSettings",
    "homePage",
    "aboutPage",
    "programPage",
    "admissionsPage",
    "pricingPage",
    "contactPage",
  ]

  const docs = await client.fetch('*[_type in $types]{...}', { types })
  if (!docs.length) {
    console.log("No CMS documents found.")
    return
  }

  const tx = client.transaction()
  let changedDocs = 0
  const counts = {}

  for (const doc of docs) {
    const cloned = JSON.parse(JSON.stringify(doc))
    delete cloned._rev
    delete cloned._updatedAt
    delete cloned._createdAt

    const changedFields = fillBySchema(cloned)
    if (!changedFields) continue

    counts[cloned._type] = (counts[cloned._type] || 0) + changedFields
    tx.createOrReplace(cloned)
    changedDocs++
  }

  if (!changedDocs) {
    console.log(`No changes needed. Checked ${docs.length} document(s).`)
    return
  }

  await tx.commit()
  console.log(`Updated ${changedDocs} document(s).`)
  console.log("Field updates by type:", counts)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
