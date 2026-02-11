import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { registrations } from "@/lib/db/schema"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { student_name, grade, parent_name, email, phone, message, tx_ref, payment_status } = body

    if (!student_name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await db.insert(registrations).values({
      studentName: student_name,
      grade,
      parentName: parent_name,
      email,
      phone,
      message: message || "",
      txRef: tx_ref || null,
      paymentStatus: payment_status || "completed",
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Save registration error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save registration" },
      { status: 500 },
    )
  }
}
