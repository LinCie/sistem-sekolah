import { Elysia } from "elysia";
import { UserService } from "./users.service";
import { createUserDto, updateUserDto } from "./users.dto";

const users = new Elysia({ prefix: "/users" })
  .get("/", async () => {
    const users = await UserService.getUsers();
    return users;
  })
  .get("/:id", async ({ params }) => {
    const user = await UserService.getUser(parseInt(params.id));
    return user;
  })
  .post(
    "/",
    async ({ body }) => {
      const user = await UserService.createUser(body);
      return user;
    },
    {
      body: createUserDto,
    }
  )
  .patch(
    "/:id",
    async ({ params, body }) => {
      const user = await UserService.updateUser(parseInt(params.id), body);
      return user;
    },
    {
      body: updateUserDto,
    }
  )
  .delete("/:id", async ({ params }) => {
    await UserService.deleteUser(parseInt(params.id));
    return { message: "User deleted successfully" };
  });

export { users };
