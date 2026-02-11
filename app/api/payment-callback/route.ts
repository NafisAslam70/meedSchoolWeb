import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { registrations } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const txRef = body.tx_ref || body.trx_ref
    const status = body.status

    if (txRef && status === "success") {
      await db
        .update(registrations)
        .set({ paymentStatus: "completed" })
        .where(eq(registrations.txRef, txRef))
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Payment callback error:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
