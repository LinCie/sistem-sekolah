import { Elysia } from "elysia";
import { UsersService } from "./users.service";
import { createUserDto, updateUserDto } from "./users.dto";

const users = new Elysia({ prefix: "/users" })
  .get("/", async () => {
    const users = await UsersService.getUsers();
    return users;
  })
  .get("/:id", async ({ params }) => {
    const user = await UsersService.getUser(parseInt(params.id));
    return user;
  })
  .post(
    "/",
    async ({ body }) => {
      const user = await UsersService.createUser(body);
      return user;
    },
    {
      body: createUserDto,
    }
  )
  .patch(
    "/:id",
    async ({ params, body }) => {
      const user = await UsersService.updateUser(parseInt(params.id), body);
      return user;
    },
    {
      body: updateUserDto,
    }
  )
  .delete("/:id", async ({ params }) => {
    await UsersService.deleteUser(parseInt(params.id));
    return { message: "User deleted successfully" };
  });

export { users };
