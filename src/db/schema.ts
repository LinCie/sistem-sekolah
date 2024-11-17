import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

import type { InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  hash: varchar({ length: 255 }).notNull(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  session: many(sessionsTable),
}));

export const sessionsTable = pgTable("sessions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user: integer("user_id").references(() => usersTable.id),
  expiresAt: timestamp("expires_at").notNull(),
});

export const sessionsRelations = relations(sessionsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [sessionsTable.user],
    references: [usersTable.id],
  }),
}));

export type User = InferSelectModel<typeof usersTable>;
export type Session = InferSelectModel<typeof sessionsTable>;
