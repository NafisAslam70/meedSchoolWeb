import { NextResponse } from "next/server"
import { sanityClient } from "@/sanity/lib/client"
import { pricingQuery } from "@/sanity/lib/queries"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const data = await sanityClient.fetch(pricingQuery)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Pricing CMS fetch error", error)
    return NextResponse.json({ success: false, error: "Failed to fetch" }, { status: 500 })
  }
}
