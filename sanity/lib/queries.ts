import { groq } from "next-sanity"

export const homeQuery = groq`*[_type == "homePage"][0]{
  slides[]{
    title, subtitle, description,
    primaryCta, secondaryCta,
    image{image, alt}
  },
  visionHeadline,
  visionQuote,
  visionCards,
  principles,
  ecosystemHeadline,
  ecosystemImage{image, alt},
  ecosystemBullets,
  executionSteps,
  assessmentCards,
  assessmentImage{image, alt},
  stats
}`

export const aboutQuery = groq`*[_type == "aboutPage"][0]{
  heroTitle, heroSubtitle, heroImage{image, alt},
  nameMeaning,
  blueprintTitle,
  blueprintCards,
  movements
}`

export const programsQuery = groq`*[_type == "programPage"][0]{
  heroTitle, heroSubtitle, heroImage{image, alt},
  programs
}`

export const admissionsQuery = groq`*[_type == "admissionsPage"][0]{
  heroTitle, heroSubtitle, heroImage{image, alt},
  steps
}`

export const pricingQuery = groq`*[_type == "pricingPage"][0]{
  heroTitle, heroSubtitle, heroImage{image, alt},
  plans
}`

export const contactQuery = groq`*[_type == "contactPage"][0]{
  headline, subhead, address, phone, email, mapEmbed,
  heroImage{image, alt}
}`
