import { NextResponse } from "next/server"
import { createSessionToken, validateAdminCredentials } from "@/lib/admin-auth"

const COOKIE_NAME = "admin_session"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password required." }, { status: 400 })
    }

    if (!validateAdminCredentials(email, password)) {
      return NextResponse.json({ success: false, message: "Invalid credentials." }, { status: 401 })
    }

    const token = createSessionToken(email)

    const res = NextResponse.json({ success: true })
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12, // 12h
    })
    return res
  } catch (error) {
    console.error("Admin login error:", error)
    return NextResponse.json({ success: false, message: "Internal error" }, { status: 500 })
  }
}
