"use server"

import { db } from "@/lib/db"
import { registrations } from "@/lib/db/schema"

export async function submitRegistration(formData: FormData) {
  const studentName = formData.get("student_name") as string
  const grade = formData.get("grade") as string
  const parentName = formData.get("parent_name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const message = (formData.get("message") as string) || ""

  if (!phone) {
    return {
      success: false,
      message: "Phone number is required to submit.",
    }
  }

  try {
    await db.insert(registrations).values({
      studentName: studentName || "",
      grade: grade || "",
      parentName: parentName || "",
      email: email || "",
      phone,
      message,
      paymentStatus: "not_required",
    })

    return {
      success: true,
      message: "Registration submitted successfully! We'll contact you within 24-48 hours.",
    }
  } catch (error) {
    console.error("Registration error:", error)
    return {
      success: false,
      message: `Failed to submit registration. ${error instanceof Error ? error.message : "Please try again."}`,
    }
  }
}
