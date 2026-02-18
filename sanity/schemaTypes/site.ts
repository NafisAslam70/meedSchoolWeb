import { defineField, defineType } from "sanity"

export const navLink = defineType({
  name: "navLink",
  title: "Navigation Link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "labelI18n", title: "Label (Multilingual)", type: "localizedString" }),
    defineField({ name: "href", title: "URL", type: "string" }),
  ],
})

export const socialLink = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",
  fields: [
    defineField({ name: "platform", title: "Platform", type: "string" }),
    defineField({ name: "url", title: "URL", type: "url" }),
  ],
})

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Pre-fill with sensible defaults so first doc is ready to publish
  initialValue: {
    logoText: "Meed International School",
    logoSubtext: "Holistic Education for Dual Success",
    navLinks: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Programs", href: "/programs" },
      { label: "Admissions", href: "/admissions" },
      { label: "Fees", href: "/pricing" },
      { label: "Faculty", href: "/faculty" },
      { label: "Events", href: "/events" },
      { label: "Contact", href: "/contact" },
    ],
    navCta: { label: "Apply Now", href: "/register" },
    footerBlurb:
      '"A deserved reward earned through virtue, effort, and excellence." Nurturing future leaders of excellence — masters in both Dunya and Akhirah.',
    quickLinks: [
      { label: "About Us", href: "/about" },
      { label: "Programs", href: "/programs" },
      { label: "Admissions", href: "/admissions" },
      { label: "Faculty", href: "/faculty" },
      { label: "Contact", href: "/contact" },
    ],
    programLinks: [
      { label: "Pre-Primary (Nursery, LKG, UKG)", href: "/programs" },
      { label: "Elementary (Classes I-VIII)", href: "/programs" },
      { label: "MSP & MHCP Programs", href: "/programs" },
      { label: "Baseline & Banding (T1-T4)", href: "/programs" },
    ],
    contactAddress: "Addis Ababa, Ethiopia",
    contactPhone: "+251 123 456 78",
    contactEmail: "info@meedinternational.edu",
    socials: [
      { platform: "facebook", url: "https://facebook.com" },
      { platform: "twitter", url: "https://twitter.com" },
      { platform: "instagram", url: "https://instagram.com" },
    ],
    copyrightText: "© 2025 Meed International School. All rights reserved.",
  },
  groups: [
    { name: "navbar", title: "Navbar" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({
      name: "logoText",
      title: "Logo Title",
      type: "string",
      group: "navbar",
    }),
    defineField({
      name: "logoTextI18n",
      title: "Logo Title (Multilingual)",
      type: "localizedString",
      group: "navbar",
    }),
    defineField({
      name: "logoImage",
      title: "Logo Image",
      type: "imageWithAlt",
      description: "Optional logo shown in the navbar; falls back to text monogram if empty.",
      group: "navbar",
    }),
    defineField({
      name: "logoSubtext",
      title: "Logo Subtext / Tagline",
      type: "string",
      group: "navbar",
    }),
    defineField({
      name: "logoSubtextI18n",
      title: "Logo Subtext / Tagline (Multilingual)",
      type: "localizedString",
      group: "navbar",
    }),
    defineField({
      name: "navLinks",
      title: "Nav Links",
      type: "array",
      of: [{ type: "navLink" }],
      group: "navbar",
    }),
    defineField({
      name: "navCta",
      title: "Navbar CTA",
      type: "object",
      fields: [
        defineField({ name: "label", type: "string", title: "Label" }),
        defineField({ name: "labelI18n", type: "localizedString", title: "Label (Multilingual)" }),
        defineField({ name: "href", type: "string", title: "URL" }),
      ],
      group: "navbar",
    }),
    defineField({
      name: "footerBlurb",
      title: "Footer Blurb",
      type: "text",
      rows: 3,
      group: "footer",
    }),
    defineField({
      name: "footerBlurbI18n",
      title: "Footer Blurb (Multilingual)",
      type: "localizedText",
      group: "footer",
    }),
    defineField({
      name: "quickLinks",
      title: "Quick Links",
      type: "array",
      of: [{ type: "navLink" }],
      group: "footer",
    }),
    defineField({
      name: "programLinks",
      title: "Program Links",
      type: "array",
      of: [{ type: "navLink" }],
      group: "footer",
    }),
    defineField({
      name: "contactAddress",
      title: "Contact Address",
      type: "string",
      group: "footer",
    }),
    defineField({
      name: "contactAddressI18n",
      title: "Contact Address (Multilingual)",
      type: "localizedString",
      group: "footer",
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
      group: "footer",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      group: "footer",
    }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [{ type: "socialLink" }],
      group: "footer",
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      group: "footer",
    }),
    defineField({
      name: "copyrightTextI18n",
      title: "Copyright Text (Multilingual)",
      type: "localizedString",
      group: "footer",
    }),
  ],
})
