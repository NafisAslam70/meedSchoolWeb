import { defineField, defineType } from "sanity"

export const localizedString = defineType({
  name: "localizedString",
  title: "Localized String",
  type: "object",
  fields: [
    defineField({ name: "en", type: "string", title: "English (EN)" }),
    defineField({ name: "hi", type: "string", title: "Hindi (HI)" }),
    defineField({ name: "ur", type: "string", title: "Urdu (UR)" }),
    defineField({ name: "bn", type: "string", title: "Bangla (BN)" }),
  ],
})

export const localizedText = defineType({
  name: "localizedText",
  title: "Localized Text",
  type: "object",
  fields: [
    defineField({ name: "en", type: "text", rows: 3, title: "English (EN)" }),
    defineField({ name: "hi", type: "text", rows: 3, title: "Hindi (HI)" }),
    defineField({ name: "ur", type: "text", rows: 3, title: "Urdu (UR)" }),
    defineField({ name: "bn", type: "text", rows: 3, title: "Bangla (BN)" }),
  ],
})

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "object",
  fields: [
    defineField({ name: "image", type: "image", title: "Image", options: { hotspot: true } }),
    defineField({ name: "alt", type: "string", title: "Alt text" }),
  ],
})

export const cta = defineType({
  name: "cta",
  title: "CTA",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", title: "Label" }),
    defineField({ name: "labelI18n", type: "localizedString", title: "Label (Multilingual)" }),
    defineField({ name: "href", type: "url", title: "Link" }),
  ],
})

export const stat = defineType({
  name: "stat",
  title: "Stat",
  type: "object",
  fields: [
    defineField({ name: "value", type: "string", title: "Value" }),
    defineField({ name: "label", type: "string", title: "Label" }),
    defineField({ name: "labelI18n", type: "localizedString", title: "Label (Multilingual)" }),
  ],
})

export const principle = defineType({
  name: "principle",
  title: "Guiding Principle",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "titleI18n", type: "localizedString", title: "Title (Multilingual)" }),
    defineField({ name: "description", type: "text", rows: 3, title: "Description" }),
    defineField({ name: "descriptionI18n", type: "localizedText", title: "Description (Multilingual)" }),
  ],
})

export const heroSlide = defineType({
  name: "heroSlide",
  title: "Hero Slide",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "titleI18n", type: "localizedString", title: "Title (Multilingual)" }),
    defineField({ name: "subtitle", type: "string", title: "Subtitle" }),
    defineField({ name: "subtitleI18n", type: "localizedString", title: "Subtitle (Multilingual)" }),
    defineField({ name: "description", type: "text", rows: 3, title: "Description" }),
    defineField({ name: "descriptionI18n", type: "localizedText", title: "Description (Multilingual)" }),
    defineField({ name: "image", type: "imageWithAlt", title: "Image" }),
    defineField({ name: "primaryCta", type: "cta", title: "Primary CTA" }),
    defineField({ name: "secondaryCta", type: "cta", title: "Secondary CTA" }),
  ],
})

export const richBlock = defineType({
  name: "richBlock",
  title: "Rich Text Block",
  type: "array",
  of: [{ type: "block" }],
})
