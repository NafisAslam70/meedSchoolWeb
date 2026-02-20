"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string | null
  }>({ type: null, message: null })
  const [showBanner, setShowBanner] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    setShowBanner(true)

    const hasSeenModal = typeof window !== "undefined" ? sessionStorage.getItem("admissionsModalSeen") : "yes"
    if (!hasSeenModal) {
      setShowModal(true)
      sessionStorage.setItem("admissionsModalSeen", "yes")
    }
  }, [])

  const [formData, setFormData] = useState({
    student_name: "",
    grade: "",
    parent_name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsSubmitting(true)
    setFormStatus({ type: null, message: null })

    try {
      if (!formData.phone) {
        setFormStatus({
          type: "error",
          message: "Phone number is required.",
        })
        setIsSubmitting(false)
        return
      }

      const response = await fetch("/api/save-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, payment_status: "not_required" }),
      })

      if (response.ok) {
        setFormStatus({ type: "success", message: "Submitted! Our team will contact you soon." })
        setFormData({ student_name: "", grade: "", parent_name: "", email: "", phone: "", message: "" })
        formRef.current?.reset()
      } else {
        const error = await response.json().catch(() => ({}))
        setFormStatus({ type: "error", message: error.error || "Failed to submit. Please try again." })
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred. Please check your internet connection and try again."

      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === "string") {
        errorMessage = error
      }

      setFormStatus({
        type: "error",
        message: errorMessage,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-3 w-3 mt-2 rounded-full bg-amber-500 animate-pulse" />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">Admissions are open</h3>
                <p className="text-gray-700 mt-1">
                  Only a few seats left for this term. Share your phone number now and our team will call you right
                  away. Everything else is optional.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                className="text-gray-500 hover:text-gray-800 text-lg"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => setShowModal(false)}>
              Got it, let's start
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900"></div>

        <div className="absolute top-5 md:top-10 left-5 md:left-10 w-32 md:w-64 h-32 md:h-64 bg-emerald-500 rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-5 md:bottom-10 right-5 md:right-10 w-40 md:w-80 h-40 md:h-80 bg-teal-500 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Apply to Meed International</h1>
            <p className="text-lg md:text-2xl text-emerald-100 mb-8 md:mb-10">
              {"Start your child's journey to excellence today"}
            </p>
          </div>
        </div>
      </section>

      {showBanner && (
        <div className="px-4">
          <div className="max-w-3xl mx-auto -mt-10 mb-6 bg-amber-100 border border-amber-200 text-amber-900 rounded-lg shadow-lg p-4 flex items-start gap-3">
            <div className="mt-0.5 h-3 w-3 rounded-full bg-amber-500 animate-pulse" />
            <div className="flex-1">
              <p className="font-semibold">Admissions are open — only a few seats left. Submit now to secure a spot.</p>
              <p className="text-sm mt-1 text-amber-800">Phone number is required; everything else is optional for a quick start.</p>
            </div>
            <button
              type="button"
              className="text-amber-700 hover:text-amber-900 font-semibold"
              onClick={() => setShowBanner(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Registration Form */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900">
                  Student Registration Form
                </CardTitle>
                <p className="text-gray-600 mt-2">Quick submission. Only phone number is required.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {formStatus.type && formStatus.message && (
                  <Alert variant={formStatus.type === "success" ? "default" : "destructive"}>
                    <AlertDescription>
                      {typeof formStatus.message === "string" ? formStatus.message : "An error occurred"}
                    </AlertDescription>
                  </Alert>
                )}

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  {/* Student Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Contact</h3>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter phone number (e.g., +251912345678)"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Student Information (Optional)</h3>

                    <div className="space-y-2">
                      <Label htmlFor="student_name">Student Full Name</Label>
                      <Input
                        id="student_name"
                        name="student_name"
                        type="text"
                        value={formData.student_name}
                        onChange={(e) => handleInputChange("student_name", e.target.value)}
                        placeholder="Enter student's full name"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade Level</Label>
                      <Select
                        name="grade"
                        value={formData.grade}
                        onValueChange={(value) => handleInputChange("grade", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade level (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kindergarten">Kindergarten</SelectItem>
                          <SelectItem value="1st">1st Grade</SelectItem>
                          <SelectItem value="2nd">2nd Grade</SelectItem>
                          <SelectItem value="3rd">3rd Grade</SelectItem>
                          <SelectItem value="4th">4th Grade</SelectItem>
                          <SelectItem value="5th">5th Grade</SelectItem>
                          <SelectItem value="6th">6th Grade</SelectItem>
                          <SelectItem value="7th">7th Grade</SelectItem>
                          <SelectItem value="8th">8th Grade</SelectItem>
                          <SelectItem value="9th">9th Grade</SelectItem>
                          <SelectItem value="10th">10th Grade</SelectItem>
                          <SelectItem value="11th">11th Grade</SelectItem>
                          <SelectItem value="12th">12th Grade</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Parent/Guardian Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Parent/Guardian Information (Optional)</h3>

                    <div className="space-y-2">
                      <Label htmlFor="parent_name">Parent/Guardian Full Name</Label>
                      <Input
                        id="parent_name"
                        name="parent_name"
                        type="text"
                        value={formData.parent_name}
                        onChange={(e) => handleInputChange("parent_name", e.target.value)}
                        placeholder="Enter parent/guardian full name"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter email address"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter phone number (e.g., +251912345678)"
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Additional Information</h3>

                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Comments (Optional)</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Any additional information you'd like to share..."
                        className="w-full min-h-[100px]"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg font-semibold rounded-lg disabled:opacity-50"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </div>

                  <div className="text-center text-sm text-gray-600">
                    <p>
                      By submitting this form, you agree to our terms and conditions. We will contact you within 24-48
                      hours to schedule your campus visit.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
