import { type SchemaTypeDefinition } from "sanity"
import { homePage } from "./home"
import { aboutPage } from "./about"
import { contactPage } from "./contact"
import { admissionsPage, pricingPage, programPage } from "./collections"
import { cta, heroSlide, imageWithAlt, localizedString, localizedText, principle, richBlock, stat } from "./objects"
import { siteSettings, navLink, socialLink } from "./site"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    siteSettings,
    navLink,
    socialLink,
    homePage,
    aboutPage,
    programPage,
    admissionsPage,
    pricingPage,
    contactPage,
    // Objects
    imageWithAlt,
    localizedString,
    localizedText,
    cta,
    stat,
    principle,
    heroSlide,
    richBlock,
  ],
}
