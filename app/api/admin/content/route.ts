import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { assets, pageContent } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { verifySessionToken } from "@/lib/admin-auth"

function requireAuth(req: Request) {
  const cookie = req.headers.get("cookie") || ""
  const match = cookie.split(";").map((c) => c.trim()).find((c) => c.startsWith("admin_session="))
  const token = match?.split("=")[1]
  const email = verifySessionToken(token)
  return Boolean(email)
}

export async function GET(req: Request) {
  if (!requireAuth(req)) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const page = searchParams.get("page") || "home"

  const [contentRows, assetRows] = await Promise.all([
    db.select().from(pageContent).where(eq(pageContent.page, page)),
    db.select().from(assets).where(eq(assets.page, page)),
  ])

  return NextResponse.json({
    success: true,
    page,
    content: contentRows,
    assets: assetRows,
  })
}

export async function POST(req: Request) {
  if (!requireAuth(req)) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  try {
    const body = await req.json()
    const { page, content = [], assets: assetPayload = [] } = body
    if (!page) return NextResponse.json({ success: false, message: "Page is required" }, { status: 400 })

    // replace existing entries for page
    await db.transaction(async (tx) => {
      await tx.delete(pageContent).where(eq(pageContent.page, page))
      if (Array.isArray(content) && content.length) {
        await tx.insert(pageContent).values(
          content.map((c: any) => ({
            page,
            key: String(c.key),
            value: String(c.value ?? ""),
          })),
        )
      }

      await tx.delete(assets).where(eq(assets.page, page))
      if (Array.isArray(assetPayload) && assetPayload.length) {
        await tx.insert(assets).values(
          assetPayload.map((a: any) => ({
            page,
            slot: String(a.slot),
            url: String(a.url),
            alt: a.alt ? String(a.alt) : null,
            width: a.width ? String(a.width) : null,
            height: a.height ? String(a.height) : null,
            mime: a.mime ? String(a.mime) : null,
          })),
        )
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Admin content save error:", error)
    return NextResponse.json({ success: false, message: "Failed to save" }, { status: 500 })
  }
}
