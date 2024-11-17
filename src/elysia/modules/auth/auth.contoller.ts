import { Elysia, t } from "elysia";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { createUserDto } from "../users/users.dto";

const auth = new Elysia({ prefix: "/auth" })
  .post(
    "/signup",
    async ({ cookie: { session }, body }) => {
      const user = await UsersService.createUser(body);
      const { token } = await AuthService.generateSession(user.id);
      session.set({
        value: token,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        path: "/",
      });
      return user;
    },
    {
      body: createUserDto,
    }
  )
  .post(
    "signin",
    async ({ cookie: { session }, body }) => {
      const validated = await AuthService.validateUser(body);
      if (!validated) return null;

      const { isValid, user } = validated;
      if (!isValid) return null;

      const { token } = await AuthService.generateSession(user.id);
      session.set({
        value: token,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        path: "/",
      });
      return user;
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
    }
  );

export { auth };
