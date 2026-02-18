import { defineField, defineType } from "sanity"

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", type: "string", title: "Hero Title" }),
    defineField({ name: "heroTitleI18n", type: "localizedString", title: "Hero Title (Multilingual)" }),
    defineField({ name: "heroSubtitle", type: "string", title: "Hero Subtitle" }),
    defineField({ name: "heroSubtitleI18n", type: "localizedString", title: "Hero Subtitle (Multilingual)" }),
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
      name: "blueprintTitleI18n",
      title: "Blueprint Title (Multilingual)",
      type: "localizedString",
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
            { name: "titleI18n", type: "localizedString", title: "Title (Multilingual)" },
            { name: "body", type: "text", rows: 4, title: "Body" },
            { name: "bodyI18n", type: "localizedText", title: "Body (Multilingual)" },
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
            { name: "titleI18n", type: "localizedString", title: "Title (Multilingual)" },
            { name: "description", type: "text", rows: 4, title: "Description" },
            { name: "descriptionI18n", type: "localizedText", title: "Description (Multilingual)" },
          ],
        },
      ],
    }),
  ],
})
