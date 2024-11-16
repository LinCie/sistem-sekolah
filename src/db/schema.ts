import {
  datetime,
  int,
  mysqlTable,
  serial,
  varchar,
} from "drizzle-orm/mysql-core";

import type { InferSelectModel } from "drizzle-orm";

export const usersTable = mysqlTable("users", {
  id: serial().primaryKey(),
  username: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  hash: varchar({ length: 255 }).notNull(),
});

export const sessionsTable = mysqlTable("sessions", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => usersTable.id),
  expiresAt: datetime("expires_at").notNull(),
});

export type User = InferSelectModel<typeof usersTable>;
export type Session = InferSelectModel<typeof sessionsTable>;
