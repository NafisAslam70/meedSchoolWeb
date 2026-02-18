import { NextResponse } from "next/server"
import { sanityClient } from "@/sanity/lib/client"
import { layoutQuery } from "@/sanity/lib/queries"

// No caching so nav/footer edits reflect immediately
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const data = await sanityClient.fetch(layoutQuery)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Layout CMS fetch error", error)
    return NextResponse.json({ success: false, error: "Failed to fetch layout" }, { status: 500 })
  }
}
