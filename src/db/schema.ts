import {
  integer,
  pgTable,
  varchar,
  timestamp,
  text,
} from "drizzle-orm/pg-core";

import type { InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  hash: varchar({ length: 255 }).notNull(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  session: many(sessionsTable),
}));

export const sessionsTable = pgTable("session", {
  id: text("id").primaryKey(),
  user: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const sessionsRelations = relations(sessionsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [sessionsTable.user],
    references: [usersTable.id],
  }),
}));

export type User = InferSelectModel<typeof usersTable>;
export type Session = InferSelectModel<typeof sessionsTable>;
