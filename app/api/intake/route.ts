import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { registrations } from "@/lib/db/schema"
import { createClient } from "next-sanity"
import { apiVersion, dataset, projectId } from "@/sanity/env"

const sanityToken = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_READ_TOKEN

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const fullName = (body.fullName || body.name || body.parent_name || "").trim()
    const phone = (body.phone || "").trim()
    const email = (body.email || "").trim()
    const note = (body.note || body.message || "").trim()
    const source = body.source || "landing-popup"

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 })
    }

    // 1) Neon
    await db.insert(registrations).values({
      studentName: body.student_name || "",
      grade: body.grade || "",
      parentName: fullName,
      email,
      phone,
      message: note,
      txRef: body.tx_ref || null,
      paymentStatus: body.payment_status || "not_required",
    })

    // 2) Sanity (best-effort)
    if (sanityToken) {
      const sanityClient = createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        token: sanityToken,
      })

      await sanityClient.create({
        _type: "lead",
        name: fullName || "Visitor",
        phone,
        email,
        note,
        source,
        createdAt: new Date().toISOString(),
      })
    }

    // 3) MeediadFlow Student Enquiry app (best-effort fan-out)
    if (externalIntakeUrl) {
      fetch(externalIntakeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(externalToken ? { "x-public-token": externalToken } : {}),
        },
        body: JSON.stringify({
          name: fullName || "Visitor",
          phone,
          email,
          message: note,
          source,
        }),
      }).catch((err) => console.error("MeediadFlow intake error", err))
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Intake error", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to save lead" },
      { status: 500 },
    )
  }
}
const externalIntakeUrl = process.env.MEEDIAFLOW_INTAKE_URL
const externalToken = process.env.MEEDIAFLOW_TOKEN
