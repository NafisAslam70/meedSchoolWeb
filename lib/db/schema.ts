import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core"

export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  studentName: varchar("student_name", { length: 255 }).notNull(),
  grade: varchar("grade", { length: 100 }).notNull(),
  parentName: varchar("parent_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  message: text("message"),
  txRef: varchar("tx_ref", { length: 100 }),
  paymentStatus: varchar("payment_status", { length: 50 }).default("not_required"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export type Registration = typeof registrations.$inferSelect
export type NewRegistration = typeof registrations.$inferInsert

export const assets = pgTable("assets", {
  id: serial("id").primaryKey(),
  page: varchar("page", { length: 100 }).notNull(), // e.g., "home", "about"
  slot: varchar("slot", { length: 100 }).notNull(), // e.g., "hero_main", "testimonial_bg"
  url: text("url").notNull(),
  alt: text("alt"),
  width: varchar("width", { length: 20 }),
  height: varchar("height", { length: 20 }),
  mime: varchar("mime", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const pageContent = pgTable("page_content", {
  id: serial("id").primaryKey(),
  page: varchar("page", { length: 100 }).notNull(),
  key: varchar("key", { length: 150 }).notNull(), // e.g., "hero_title"
  value: text("value").notNull(), // JSON string or plain text
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})
