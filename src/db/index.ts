import { drizzle } from "drizzle-orm/mysql2";

const db = drizzle(Bun.env.DATABASE_URL!);

export { db };
