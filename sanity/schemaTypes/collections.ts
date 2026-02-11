import { defineField, defineType } from "sanity"

export const programPage = defineType({
  name: "programPage",
  title: "Programs Page",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", type: "string", title: "Hero Title" }),
    defineField({ name: "heroSubtitle", type: "string", title: "Hero Subtitle" }),
    defineField({ name: "heroImage", type: "imageWithAlt", title: "Hero Image" }),
    defineField({
      name: "programs",
      title: "Programs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", rows: 3, title: "Description" },
          ],
        },
      ],
    }),
  ],
})

export const admissionsPage = defineType({
  name: "admissionsPage",
  title: "Admissions Page",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", type: "string", title: "Hero Title" }),
    defineField({ name: "heroSubtitle", type: "string", title: "Hero Subtitle" }),
    defineField({ name: "heroImage", type: "imageWithAlt", title: "Hero Image" }),
    defineField({
      name: "steps",
      title: "Admission Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", rows: 3, title: "Description" },
          ],
        },
      ],
    }),
  ],
})

export const pricingPage = defineType({
  name: "pricingPage",
  title: "Pricing Page",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", type: "string", title: "Hero Title" }),
    defineField({ name: "heroSubtitle", type: "string", title: "Hero Subtitle" }),
    defineField({ name: "heroImage", type: "imageWithAlt", title: "Hero Image" }),
    defineField({
      name: "plans",
      title: "Plans",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Plan name" },
            { name: "price", type: "string", title: "Price" },
            { name: "features", type: "array", of: [{ type: "string" }], title: "Features" },
          ],
        },
      ],
    }),
  ],
})
