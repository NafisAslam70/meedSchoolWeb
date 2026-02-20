import { defineField, defineType } from "sanity"

export const lead = defineType({
  name: "lead",
  title: "Leads (Web)",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "note", title: "Note / Details", type: "text" }),
    defineField({ name: "source", title: "Source", type: "string" }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      options: { dateFormat: "YYYY-MM-DD", timeFormat: "HH:mm" },
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "phone",
    },
  },
})
