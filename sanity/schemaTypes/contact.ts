import { defineField, defineType } from "sanity"

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "headline", type: "string", title: "Headline" }),
    defineField({ name: "headlineI18n", type: "localizedString", title: "Headline (Multilingual)" }),
    defineField({ name: "subhead", type: "string", title: "Subhead" }),
    defineField({ name: "subheadI18n", type: "localizedString", title: "Subhead (Multilingual)" }),
    defineField({ name: "address", type: "string", title: "Address" }),
    defineField({ name: "addressI18n", type: "localizedString", title: "Address (Multilingual)" }),
    defineField({ name: "phone", type: "string", title: "Phone" }),
    defineField({ name: "email", type: "string", title: "Email" }),
    defineField({
      name: "mapEmbed",
      type: "text",
      rows: 3,
      title: "Map embed (iframe or URL)",
    }),
    defineField({
      name: "heroImage",
      type: "imageWithAlt",
      title: "Hero Image",
    }),
  ],
})
