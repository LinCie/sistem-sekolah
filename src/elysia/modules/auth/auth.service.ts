import { eq } from "drizzle-orm";

import { db } from "@/db";
import { Session, User, usersTable } from "@/db/schema";
import {
  createSession,
  generateSessionToken,
} from "@/services/session.service";

abstract class AuthService {
  static async generateSession(
    userId: number
  ): Promise<{ token: string; session: Session }> {
    const token = generateSessionToken();
    const session = await createSession(token, userId);
    return { token, session };
  }

  static async validateUser(data: {
    username: string;
    password: string;
  }): Promise<{ user: User; isValid: boolean } | null> {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, data.username));

    if (user.length < 1) return null;

    const isValid = await Bun.password.verify(data.password, user[0].hash);
    return { user: user[0], isValid };
  }
}
export { AuthService };
