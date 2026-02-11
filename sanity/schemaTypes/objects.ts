import { defineField, defineType } from "sanity"

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
  ],
})

export const principle = defineType({
  name: "principle",
  title: "Guiding Principle",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "description", type: "text", rows: 3, title: "Description" }),
  ],
})

export const heroSlide = defineType({
  name: "heroSlide",
  title: "Hero Slide",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "subtitle", type: "string", title: "Subtitle" }),
    defineField({ name: "description", type: "text", rows: 3, title: "Description" }),
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
