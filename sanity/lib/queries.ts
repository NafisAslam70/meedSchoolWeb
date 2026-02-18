import { groq } from "next-sanity"

export const homeQuery = groq`*[_type == "homePage"][0]{
  videoUrl,
  slides[]{
    title, titleI18n, subtitle, subtitleI18n, description, descriptionI18n,
    primaryCta{label, labelI18n, href}, secondaryCta{label, labelI18n, href},
    image{image, alt}
  },
  visionHeadline, visionHeadlineI18n,
  visionQuote, visionQuoteI18n,
  visionCards[]{title, titleI18n, description, descriptionI18n},
  principles[]{title, titleI18n, description, descriptionI18n},
  ecosystemHeadline, ecosystemHeadlineI18n,
  ecosystemImage{image, alt},
  ecosystemGallery[]{image, alt},
  ecosystemBullets[]{title, titleI18n, description, descriptionI18n},
  executionSteps[]{title, titleI18n, description, descriptionI18n},
  assessmentCards[]{title, titleI18n, description, descriptionI18n},
  assessmentImage{image, alt},
  assessmentGallery[]{image, alt},
  stats[]{value, label, labelI18n}
}`

export const aboutQuery = groq`*[_type == "aboutPage"][0]{
  heroTitle, heroTitleI18n, heroSubtitle, heroSubtitleI18n, heroImage{image, alt},
  nameMeaning,
  blueprintTitle, blueprintTitleI18n,
  blueprintCards[]{title, titleI18n, body, bodyI18n},
  movements[]{title, titleI18n, description, descriptionI18n}
}`

export const programsQuery = groq`*[_type == "programPage"][0]{
  heroTitle, heroTitleI18n, heroSubtitle, heroSubtitleI18n, heroImage{image, alt},
  programs[]{title, titleI18n, description, descriptionI18n}
}`

export const admissionsQuery = groq`*[_type == "admissionsPage"][0]{
  heroTitle, heroTitleI18n, heroSubtitle, heroSubtitleI18n, heroImage{image, alt},
  steps[]{title, titleI18n, description, descriptionI18n}
}`

export const pricingQuery = groq`*[_type == "pricingPage"][0]{
  heroTitle, heroTitleI18n, heroSubtitle, heroSubtitleI18n, heroImage{image, alt},
  plans[]{name, nameI18n, price, features}
}`

export const contactQuery = groq`*[_type == "contactPage"][0]{
  headline, headlineI18n, subhead, subheadI18n, address, addressI18n, phone, email, mapEmbed,
  heroImage{image, alt}
}`

export const layoutQuery = groq`*[_type == "siteSettings"][0]{
  logoText, logoTextI18n,
  logoImage{image, alt},
  logoSubtext, logoSubtextI18n,
  navLinks[]{label, labelI18n, href},
  navCta{label, labelI18n, href},
  footerBlurb, footerBlurbI18n,
  quickLinks[]{label, labelI18n, href},
  programLinks[]{label, labelI18n, href},
  contactAddress, contactAddressI18n,
  contactPhone,
  contactEmail,
  socials,
  copyrightText, copyrightTextI18n
}`
