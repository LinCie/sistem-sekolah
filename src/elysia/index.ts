import { Elysia, t } from "elysia";

const elysia = new Elysia({ prefix: "/api" })
  .get("/", () => "hello Next")
  .post("/", ({ body }) => body, {
    body: t.Object({
      name: t.String(),
    }),
  });

export { elysia };
