import { defineField, defineType } from "sanity"

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "vision", title: "Vision / Mission" },
    { name: "principles", title: "Guiding Principles" },
    { name: "ecosystem", title: "Full-Day Ecosystem" },
    { name: "execution", title: "Execution Formula" },
    { name: "assessment", title: "Assessment" },
    { name: "stats", title: "Stats" },
  ],
  fields: [
    defineField({
      name: "slides",
      title: "Hero Slides",
      type: "array",
      of: [{ type: "heroSlide" }],
      group: "hero",
    }),
    defineField({
      name: "videoUrl",
      title: "Hero Video (YouTube URL)",
      type: "url",
      description: "Paste a full YouTube link to feature a brand film under the hero.",
      group: "hero",
    }),
    defineField({
      name: "visionHeadline",
      title: "Vision headline",
      type: "string",
      group: "vision",
    }),
    defineField({
      name: "visionHeadlineI18n",
      title: "Vision headline (Multilingual)",
      type: "localizedString",
      group: "vision",
    }),
    defineField({
      name: "visionQuote",
      title: "Vision quote",
      type: "text",
      rows: 3,
      group: "vision",
    }),
    defineField({
      name: "visionQuoteI18n",
      title: "Vision quote (Multilingual)",
      type: "localizedText",
      group: "vision",
    }),
    defineField({
      name: "visionCards",
      title: "Vision cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "titleI18n", type: "localizedString", title: "Title (Multilingual)" },
            { name: "description", type: "text", rows: 3, title: "Description" },
            { name: "descriptionI18n", type: "localizedText", title: "Description (Multilingual)" },
          ],
        },
      ],
      group: "vision",
    }),
    defineField({
      name: "principles",
      title: "Guiding Principles",
      type: "array",
      of: [{ type: "principle" }],
      group: "principles",
    }),
    defineField({
      name: "ecosystemHeadline",
      title: "Ecosystem headline",
      type: "string",
      group: "ecosystem",
    }),
    defineField({
      name: "ecosystemHeadlineI18n",
      title: "Ecosystem headline (Multilingual)",
      type: "localizedString",
      group: "ecosystem",
    }),
    defineField({
      name: "ecosystemImage",
      title: "Ecosystem image",
      type: "imageWithAlt",
      group: "ecosystem",
    }),
    defineField({
      name: "ecosystemGallery",
      title: "Ecosystem gallery",
      description: "Optional carousel; add multiple images to create a slider.",
      type: "array",
      of: [{ type: "imageWithAlt" }],
      group: "ecosystem",
    }),
    defineField({
      name: "ecosystemBullets",
      title: "Ecosystem bullets",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "titleI18n", type: "localizedString", title: "Title (Multilingual)" },
            { name: "description", type: "text", rows: 2, title: "Description" },
            { name: "descriptionI18n", type: "localizedText", title: "Description (Multilingual)" },
          ],
        },
      ],
      group: "ecosystem",
    }),
    defineField({
      name: "executionSteps",
      title: "Execution steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "titleI18n", type: "localizedString", title: "Title (Multilingual)" },
            { name: "description", type: "text", rows: 2, title: "Description" },
            { name: "descriptionI18n", type: "localizedText", title: "Description (Multilingual)" },
          ],
        },
      ],
      group: "execution",
    }),
    defineField({
      name: "assessmentCards",
      title: "Assessment cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "titleI18n", type: "localizedString", title: "Title (Multilingual)" },
            { name: "description", type: "text", rows: 3, title: "Description" },
            { name: "descriptionI18n", type: "localizedText", title: "Description (Multilingual)" },
          ],
        },
      ],
      group: "assessment",
    }),
    defineField({
      name: "assessmentImage",
      title: "Assessment image",
      type: "imageWithAlt",
      group: "assessment",
    }),
    defineField({
      name: "assessmentGallery",
      title: "Assessment gallery",
      description: "Add 3-5 shots to show assessment in action.",
      type: "array",
      of: [{ type: "imageWithAlt" }],
      group: "assessment",
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [{ type: "stat" }],
      group: "stats",
    }),
  ],
})
