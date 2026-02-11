import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { verifySessionToken } from "@/lib/admin-auth"

export const dynamic = "force-dynamic"

function requireAuth(req: Request) {
  const cookie = req.headers.get("cookie") || ""
  const match = cookie.split(";").map((c) => c.trim()).find((c) => c.startsWith("admin_session="))
  const token = match?.split("=")[1]
  const email = verifySessionToken(token)
  return Boolean(email)
}

export async function POST(req: Request) {
  if (!requireAuth(req)) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get("file")

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ success: false, message: "File is required" }, { status: 400 })
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ success: false, message: "Max size 5MB" }, { status: 400 })
  }

  const filename = `cms/${Date.now()}-${file.name.replace(/\s+/g, "-")}`

  const blob = await put(filename, file, {
    access: "public",
  })

  return NextResponse.json({
    success: true,
    url: blob.url,
    pathname: blob.pathname,
    size: blob.size,
    contentType: blob.contentType,
  })
}
