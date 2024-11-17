import { Elysia } from "elysia";
import { auth } from "./modules/auth/auth.contoller";

const elysia = new Elysia({ prefix: "/api" })
  .use(auth)
  .get("/", () => "hello Next")


export { elysia };
