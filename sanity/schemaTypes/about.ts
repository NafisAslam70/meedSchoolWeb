import { defineField, defineType } from "sanity"

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", type: "string", title: "Hero Title" }),
    defineField({ name: "heroSubtitle", type: "string", title: "Hero Subtitle" }),
    defineField({ name: "heroImage", type: "imageWithAlt", title: "Hero Image" }),

    defineField({
      name: "nameMeaning",
      title: "Meaning Behind the Name",
      type: "richBlock",
    }),

    defineField({
      name: "blueprintTitle",
      title: "Blueprint Title",
      type: "string",
    }),
    defineField({
      name: "blueprintCards",
      title: "Blueprint Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "body", type: "text", rows: 4, title: "Body" },
          ],
        },
      ],
    }),

    defineField({
      name: "movements",
      title: "Four Movements",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", rows: 4, title: "Description" },
          ],
        },
      ],
    }),
  ],
})
