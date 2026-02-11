"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

type ContentItem = { key: string; value: string }
type AssetItem = { slot: string; url: string; alt?: string; mime?: string }

const pages = ["home", "about", "programs", "admissions", "pricing", "events", "faculty", "contact"]

export default function AdminPage() {
  const [page, setPage] = useState<string>("home")
  const [content, setContent] = useState<ContentItem[]>([])
  const [assets, setAssets] = useState<AssetItem[]>([])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string | null }>({
    type: null,
    message: null,
  })
  const [loading, setLoading] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  const fetchPage = async (p = page) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/content?page=${p}`)
      if (res.status === 401) {
        setAuthenticated(false)
        setStatus({ type: "error", message: "Please log in" })
        setLoading(false)
        return
      }
      const data = await res.json()
      setAuthenticated(true)
      setContent(data.content || [])
      setAssets(data.assets || [])
      setStatus({ type: null, message: null })
    } catch (error) {
      setStatus({ type: "error", message: "Failed to load content" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPage("home")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async () => {
    setLoading(true)
    setStatus({ type: null, message: null })
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (data.success) {
        setAuthenticated(true)
        setStatus({ type: "success", message: "Logged in" })
        fetchPage(page)
      } else {
        setStatus({ type: "error", message: data.message || "Login failed" })
      }
    } catch {
      setStatus({ type: "error", message: "Login failed" })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    setStatus({ type: null, message: null })
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page, content, assets }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus({ type: "success", message: "Saved" })
      } else {
        setStatus({ type: "error", message: data.message || "Save failed" })
      }
    } catch {
      setStatus({ type: "error", message: "Save failed" })
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (slot: string, file: File) => {
    setStatus({ type: null, message: null })
    const formData = new FormData()
    formData.append("file", file)
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData })
    const data = await res.json()
    if (data.success) {
      const updated = assets.filter((a) => a.slot !== slot)
      updated.push({ slot, url: data.url, mime: file.type })
      setAssets(updated)
      setStatus({ type: "success", message: "Uploaded" })
    } else {
      setStatus({ type: "error", message: data.message || "Upload failed" })
    }
  }

  const updateContentItem = (index: number, field: "key" | "value", value: string) => {
    const updated = [...content]
    updated[index] = { ...updated[index], [field]: value }
    setContent(updated)
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {status.type && (
              <Alert variant={status.type === "error" ? "destructive" : "default"}>
                <AlertDescription>{status.message}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button className="w-full" onClick={handleLogin} disabled={loading}>
              {loading ? "..." : "Login"}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Select value={page} onValueChange={(v) => { setPage(v); fetchPage(v) }}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Choose page" />
              </SelectTrigger>
              <SelectContent>
                {pages.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="secondary" onClick={() => fetchPage(page)} disabled={loading}>
              Refresh
            </Button>
            <Button variant="default" onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              await fetch("/api/admin/logout", { method: "POST" })
              setAuthenticated(false)
            }}
          >
            <Button variant="outline">Logout</Button>
          </form>
        </div>

        {status.type && (
          <Alert variant={status.type === "error" ? "destructive" : "default"}>
            <AlertDescription>{status.message}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Copy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
                <div>
                  <Label>Key</Label>
                  <Input value={item.key} onChange={(e) => updateContentItem(idx, "key", e.target.value)} />
                </div>
                <div>
                  <Label>Value</Label>
                  <Textarea value={item.value} onChange={(e) => updateContentItem(idx, "value", e.target.value)} />
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => setContent([...content, { key: "new_key", value: "" }])}
              size="sm"
            >
              Add field
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {assets.map((asset, idx) => (
              <div key={idx} className="space-y-2 border rounded-lg p-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                  <div>
                    <Label>Slot</Label>
                    <Input
                      value={asset.slot}
                      onChange={(e) => {
                        const updated = [...assets]
                        updated[idx] = { ...asset, slot: e.target.value }
                        setAssets(updated)
                      }}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Image URL</Label>
                    <Input
                      value={asset.url}
                      onChange={(e) => {
                        const updated = [...assets]
                        updated[idx] = { ...asset, url: e.target.value }
                        setAssets(updated)
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Alt</Label>
                    <Input
                      value={asset.alt || ""}
                      onChange={(e) => {
                        const updated = [...assets]
                        updated[idx] = { ...asset, alt: e.target.value }
                        setAssets(updated)
                      }}
                    />
                  </div>
                  <div>
                    <Label>Replace via upload</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) handleFileUpload(asset.slot, e.target.files[0])
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setAssets([...assets, { slot: "new_slot", url: "" }])}>
              Add image slot
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
