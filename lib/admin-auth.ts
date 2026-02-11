import crypto from "crypto"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || ""
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || ""
const SESSION_SECRET = process.env.SESSION_SECRET || ""
const SESSION_TTL_MS = 1000 * 60 * 60 * 12 // 12 hours

export function validateAdminCredentials(email: string, password: string) {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD && ADMIN_EMAIL && ADMIN_PASSWORD
}

function sign(data: string) {
  return crypto.createHmac("sha256", SESSION_SECRET).update(data).digest("hex")
}

export function createSessionToken(email: string) {
  const expires = Date.now() + SESSION_TTL_MS
  const payload = `${email}:${expires}`
  const signature = sign(payload)
  return Buffer.from(`${payload}:${signature}`).toString("base64url")
}

export function verifySessionToken(token: string | undefined | null) {
  if (!token || !SESSION_SECRET) return null
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8")
    const [email, expiresStr, signature] = decoded.split(":")
    if (!email || !expiresStr || !signature) return null
    if (Date.now() > Number(expiresStr)) return null
    const expectedSig = sign(`${email}:${expiresStr}`)
    if (signature !== expectedSig) return null
    if (email !== ADMIN_EMAIL) return null
    return email
  } catch {
    return null
  }
}
