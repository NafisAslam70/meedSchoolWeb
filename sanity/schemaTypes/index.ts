import { type SchemaTypeDefinition } from "sanity"
import { homePage } from "./home"
import { aboutPage } from "./about"
import { contactPage } from "./contact"
import { admissionsPage, pricingPage, programPage } from "./collections"
import { cta, heroSlide, imageWithAlt, principle, richBlock, stat } from "./objects"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    homePage,
    aboutPage,
    programPage,
    admissionsPage,
    pricingPage,
    contactPage,
    // Objects
    imageWithAlt,
    cta,
    stat,
    principle,
    heroSlide,
    richBlock,
  ],
}
