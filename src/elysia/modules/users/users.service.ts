import { db } from "@/db";
import { User, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { CreateUserDto, UpdateUserDto } from "./users.dto";

class UsersService {
  static async getUsers(): Promise<User[]> {
    return await db.select().from(usersTable);
  }

  static async getUser(id: number): Promise<User | null> {
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));

    if (users.length < 0) return null;
    return users[0];
  }

  static async createUser(data: CreateUserDto): Promise<User> {
    const hash = await Bun.password.hash(data.password);

    const user = await db
      .insert(usersTable)
      .values({
        username: data.username,
        name: data.name,
        hash: hash,
      })
      .returning();
    return user[0];
  }

  static async updateUser(
    id: number,
    data: UpdateUserDto
  ): Promise<User | null> {
    const user = await UsersService.getUser(id);
    if (!user) return null;
    await db.update(usersTable).set(data).where(eq(usersTable.id, id));
    return await UsersService.getUser(id);
  }

  static async deleteUser(id: number): Promise<void> {
    await db.delete(usersTable).where(eq(usersTable.id, id));
  }
}

export { UsersService };
