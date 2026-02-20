"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Home, FileText } from "lucide-react"

export default function RegisterSuccessPage() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "error" | null
    message: string | null
  }>({ type: null, message: null })

  const [registrationData, setRegistrationData] = useState<{
    student_name: string
    grade: string
    parent_name: string
    email: string
    phone: string
    message: string
    tx_ref: string
  } | null>(null)

  useEffect(() => {
    const saveRegistration = async () => {
      try {
        const student_name = searchParams.get("student_name") || ""
        const grade = searchParams.get("grade") || ""
        const parent_name = searchParams.get("parent_name") || ""
        const email = searchParams.get("email") || ""
        const phone = searchParams.get("phone") || ""
        const message = searchParams.get("message") || ""
        const tx_ref = searchParams.get("tx_ref") || ""

        if (!phone) {
          setSaveStatus({
            type: "error",
            message: "Missing required registration information. Please contact the school.",
          })
          setIsLoading(false)
          return
        }

        setRegistrationData({
          student_name,
          grade,
          parent_name,
          email,
          phone,
          message,
          tx_ref,
        })

        const res = await fetch("/api/save-registration", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            student_name,
            grade,
            parent_name,
            email,
            phone,
            message,
            tx_ref,
            payment_status: "completed",
          }),
        })

        if (res.ok) {
          setSaveStatus({
            type: "success",
            message: "Your registration has been completed successfully! We will contact you within 24-48 hours.",
          })
        } else {
          setSaveStatus({
            type: "error",
            message:
              "Registration data saved locally, but there was an issue with our database. We will contact you soon.",
          })
        }
      } catch {
        setSaveStatus({
          type: "error",
          message: "There was an unexpected error. Please contact the school directly.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    saveRegistration()
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto" />
            <p className="mt-4 text-muted-foreground">Processing your registration...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-800" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <CheckCircle className="w-20 h-20 text-white mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Registration Complete!</h1>
            <p className="text-lg md:text-2xl text-emerald-100 mb-8">Welcome to the Meed International School family</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {saveStatus.type && (
              <Alert variant={saveStatus.type === "success" ? "default" : "destructive"} className="mb-8">
                <AlertDescription className="text-lg">{saveStatus.message}</AlertDescription>
              </Alert>
            )}

            {registrationData && (
              <Card className="shadow-xl border-0 mb-8">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-foreground">Registration Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-muted-foreground">Student Name</h4>
                      <p className="text-foreground">{registrationData.student_name}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-muted-foreground">Grade Level</h4>
                      <p className="text-foreground">{registrationData.grade}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-muted-foreground">{"Parent/Guardian"}</h4>
                      <p className="text-foreground">{registrationData.parent_name}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-muted-foreground">Email</h4>
                      <p className="text-foreground">{registrationData.email}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-muted-foreground">Phone</h4>
                      <p className="text-foreground">{registrationData.phone}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-muted-foreground">Transaction ID</h4>
                      <p className="text-foreground font-mono text-sm">{registrationData.tx_ref}</p>
                    </div>
                  </div>

                  {registrationData.message && (
                    <div>
                      <h4 className="font-semibold text-muted-foreground">Additional Comments</h4>
                      <p className="text-foreground">{registrationData.message}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <Card className="shadow-xl border-0 mb-8">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-emerald-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Confirmation Email</h4>
                    <p className="text-muted-foreground">
                      You will receive a confirmation email within the next hour with your registration details.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-emerald-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">School Contact</h4>
                    <p className="text-muted-foreground">
                      Our admissions team will contact you within 24-48 hours to schedule a campus visit and discuss
                      next steps.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-emerald-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Campus Visit</h4>
                    <p className="text-muted-foreground">
                      {"Schedule a tour of our facilities and meet with our academic team to discuss your child's educational journey."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => (window.location.href = "/")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3"
              >
                <Home className="w-4 h-4 mr-2" />
                Return to Home
              </Button>

              <Button
                onClick={() => window.print()}
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent px-8 py-3"
              >
                <FileText className="w-4 h-4 mr-2" />
                Print Summary
              </Button>
            </div>

            <div className="mt-12 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-4">Need Help?</h3>
              <p className="text-muted-foreground mb-2">If you have any questions, please contact our admissions office:</p>
              <p className="text-foreground font-semibold">
                +251 123 456 78 | admissions@meedinternational.edu
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
