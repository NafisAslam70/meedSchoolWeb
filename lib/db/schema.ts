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
  paymentStatus: varchar("payment_status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export type Registration = typeof registrations.$inferSelect
export type NewRegistration = typeof registrations.$inferInsert
