import { NextResponse } from "next/server"
import { sanityClient } from "@/sanity/lib/client"
import { homeQuery } from "@/sanity/lib/queries"

// Always serve fresh CMS data (no 60s cache) so newly published content appears immediately
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const data = await sanityClient.fetch(homeQuery)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Home CMS fetch error", error)
    return NextResponse.json({ success: false, error: "Failed to fetch" }, { status: 500 })
  }
}
