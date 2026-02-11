import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const sponsors = pgTable("sponsors", {
  "id": serial("id").primaryKey(),
  "imageUrl": text("image_url").notNull(),
  "name": text("name").notNull(),
  "link": text("link").notNull(),
  "createdAt": timestamp("created_at").defaultNow().notNull(),
})

export const news = pgTable("news", {
  "id": serial("id").primaryKey(),
  "title": text("title").notNull(),
  "content": text("content").notNull(),
  "imageUrl": text("image_url").notNull(),
  "createdAt": timestamp("created_at").defaultNow().notNull(),
})

export const admin = pgTable("admin", {
  "id": serial("id").primaryKey(),
  "passwordHash": text("password_hash").notNull(),
})

export const ads = pgTable("ads", {
  "id": serial("id").primaryKey(),
  "imageUrl": text("image_url").notNull(),
  "link": text("link").notNull(),
  "createdAt": timestamp("created_at").defaultNow().notNull(),
})

export const donations = pgTable("donations", {
  "id": serial("id").primaryKey(),
  "fullName": text("full_name").notNull(),
  "email": text("email").notNull(),
  "amount": text("amount").notNull(),
  "panCard": text("pan_card").notNull(),
  "transactionId": text("transaction_id").notNull(),
  "proofImageUrl": text("proof_image_url").notNull(),
  "status": text("status").default("pending").notNull(), // pending, verified, rejected
  "createdAt": timestamp("created_at").defaultNow().notNull(),
})

export const gallery = pgTable("gallery", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imagePath: varchar("image_path", { length: 500 }).notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});


export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  image: text("image").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
