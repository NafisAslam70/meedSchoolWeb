import { NextResponse } from "next/server"
import { sanityClient } from "@/sanity/lib/client"
import { admissionsQuery } from "@/sanity/lib/queries"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const data = await sanityClient.fetch(admissionsQuery)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Admissions CMS fetch error", error)
    return NextResponse.json({ success: false, error: "Failed to fetch" }, { status: 500 })
  }
}
