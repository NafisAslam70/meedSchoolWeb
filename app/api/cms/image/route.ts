import { NextRequest, NextResponse } from "next/server"
import { projectId, dataset } from "@/sanity/env"
import { createClient } from "next-sanity"

export const dynamic = "force-dynamic"

// Proxy to Sanity image CDN. Pass ?ref=<JSON-stringified image or asset with _ref>
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const refParam = searchParams.get("ref")
  if (!refParam) {
    return NextResponse.json({ error: "Missing ref" }, { status: 400 })
  }

  try {
    const parsed = JSON.parse(refParam)
    const assetRef = parsed?._ref || parsed?.asset?._ref
    if (!assetRef) {
      return NextResponse.json({ error: "Invalid ref" }, { status: 400 })
    }

    const cdnClient = createClient({ projectId, dataset, apiVersion: "2024-10-01", useCdn: true })
    // @ts-ignore getImageUrl exists on next-sanity client
    const url = cdnClient.getImageUrl(assetRef)
    if (!url) return NextResponse.json({ error: "Invalid asset" }, { status: 400 })
    return NextResponse.redirect(url)
  } catch (e) {
    return NextResponse.json({ error: "Failed to parse ref" }, { status: 400 })
  }
}
