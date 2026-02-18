/* Fill multilingual fields for every homepage section document (published + draft). */

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

function i18nFor(text) {
  if (typeof text !== "string" || !text.trim()) return null
  const en = text.trim()
  const mapped = translations[en]
  return { en, hi: mapped?.hi || en, ur: mapped?.ur || en, bn: mapped?.bn || en }
}

function setI18n(target, key) {
  if (!target || typeof target !== "object") return false
  const val = target[key]
  if (typeof val !== "string" || !val.trim()) return false
  const out = i18nFor(val)
  if (!out) return false
  const i18nKey = `${key}I18n`
  const prev = target[i18nKey] || {}
  if (prev.en && prev.hi && prev.ur && prev.bn) return false
  target[i18nKey] = { ...prev, ...out }
  return true
}

function patchHomeDoc(doc) {
  let changed = false
  changed = setI18n(doc, "visionHeadline") || changed
  changed = setI18n(doc, "visionQuote") || changed
  changed = setI18n(doc, "ecosystemHeadline") || changed

  const sections = [
    ["slides", ["title", "subtitle", "description"]],
    ["visionCards", ["title", "description"]],
    ["principles", ["title", "description"]],
    ["ecosystemBullets", ["title", "description"]],
    ["executionSteps", ["title", "description"]],
    ["assessmentCards", ["title", "description"]],
    ["stats", ["label"]],
  ]

  for (const [arrKey, keys] of sections) {
    const arr = doc[arrKey]
    if (!Array.isArray(arr)) continue
    for (const item of arr) {
      if (!item || typeof item !== "object") continue
      for (const key of keys) changed = setI18n(item, key) || changed
      if (arrKey === "slides") {
        if (item.primaryCta) changed = setI18n(item.primaryCta, "label") || changed
        if (item.secondaryCta) changed = setI18n(item.secondaryCta, "label") || changed
      }
    }
  }

  return changed
}

async function run() {
  const docs = await client.fetch('*[_type == "homePage"]{...}')
  if (!docs.length) {
    console.log("No homePage docs found.")
    return
  }

  const tx = client.transaction()
  let changedCount = 0

  for (const doc of docs) {
    const cloned = JSON.parse(JSON.stringify(doc))
    delete cloned._rev
    delete cloned._updatedAt
    delete cloned._createdAt
    if (!patchHomeDoc(cloned)) continue
    tx.createOrReplace(cloned)
    changedCount++
  }

  if (!changedCount) {
    console.log(`Homepage i18n already filled. Checked ${docs.length} doc(s).`)
    return
  }

  await tx.commit()
  console.log(`Filled homepage i18n fields in ${changedCount} doc(s).`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
