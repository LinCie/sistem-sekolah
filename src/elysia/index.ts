import { Elysia } from "elysia";
import { auth } from "./modules/auth/auth.contoller";
import { users } from "./modules/users/users.controller";

const elysia = new Elysia({ prefix: "/api" })
  .use(auth)
  .use(users)
  .get("/", () => "hello Next");

export { elysia };
