import { NextResponse } from "next/server"
import { sanityClient } from "@/sanity/lib/client"
import { programsQuery } from "@/sanity/lib/queries"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const data = await sanityClient.fetch(programsQuery)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Programs CMS fetch error", error)
    return NextResponse.json({ success: false, error: "Failed to fetch" }, { status: 500 })
  }
}
