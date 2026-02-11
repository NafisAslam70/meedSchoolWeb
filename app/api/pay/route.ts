import { NextResponse } from "next/server"
import { nanoid } from "nanoid"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!process.env.CHAPA_SECRET_KEY) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment service configuration error. Please contact support.",
        },
        { status: 500 },
      )
    }

    const tx_ref = "MIS_" + nanoid()

    const chapaPayload = {
      amount: "150",
      currency: "ETB",
      email: body.email,
      first_name: body.student_name || body.name,
      phone_number: body.phone,
      tx_ref,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://meedinternational.vercel.app"}/register-success?student_name=${encodeURIComponent(body.student_name || "")}&grade=${encodeURIComponent(body.grade || "")}&parent_name=${encodeURIComponent(body.parent_name || "")}&email=${encodeURIComponent(body.email || "")}&phone=${encodeURIComponent(body.phone || "")}&message=${encodeURIComponent(body.message || "")}&tx_ref=${tx_ref}`,
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://meedinternational.vercel.app"}/api/payment-callback`,
      customization: {
        title: "MIS Registration",
        description: "Secure your seat at Meed",
        logo: "",
      },
      metadata: {
        student_name: body.student_name,
        grade: body.grade,
        parent_name: body.parent_name,
        email: body.email,
        phone: body.phone,
        message: body.message,
      },
    }

    const chapaRes = await fetch("https://api.chapa.co/v1/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chapaPayload),
    })

    const responseText = await chapaRes.text()

    let data
    try {
      data = JSON.parse(responseText)
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid response from payment service",
        },
        { status: 500 },
      )
    }

    if (data.status === "success" && data.data?.checkout_url) {
      return NextResponse.json({
        success: true,
        url: data.data.checkout_url,
        tx_ref,
      })
    } else if (data.status === "failed" || data.status === "error") {
      let errorMessage = "Payment initialization failed"

      if (data.message && typeof data.message === "string") {
        errorMessage = data.message
      } else if (data.message && typeof data.message === "object") {
        const errors: string[] = []
        for (const [, messages] of Object.entries(data.message)) {
          if (Array.isArray(messages)) {
            errors.push(...messages)
          } else {
            errors.push(String(messages))
          }
        }
        errorMessage = errors.length > 0 ? errors.join(". ") : "Payment validation failed"
      }

      return NextResponse.json(
        {
          success: false,
          message: errorMessage,
        },
        { status: 400 },
      )
    } else if (!chapaRes.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || `Payment service error (${chapaRes.status})`,
        },
        { status: chapaRes.status },
      )
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Unexpected response from payment service",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again.",
      },
      { status: 500 },
    )
  }
}
