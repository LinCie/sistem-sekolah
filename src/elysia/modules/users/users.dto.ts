import { t } from "elysia";

const createUserDto = t.Object({
  username: t.String({
    minLength: 5,
    maxLength: 255,
    pattern: "/^[a-zA-Z][a-zA-Z0-9_]*$/",
  }),
  name: t.String({
    minLength: 5,
    maxLength: 255,
    pattern: "/^[A-Z][a-zA-Z'’-]*(?: [A-Z][a-zA-Z'’-]*)*$/",
  }),
  password: t.String({
    minLength: 8,
    maxLength: 255,
    pattern: "/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/",
  }),
});

type CreateUserDto = typeof createUserDto.static;

const updateUserDto = t.Object({
  username: t.Optional(
    t.String({
      minLength: 5,
      maxLength: 255,
      pattern: "/^[a-zA-Z][a-zA-Z0-9_]*$/",
    })
  ),
  name: t.Optional(
    t.String({
      minLength: 5,
      maxLength: 255,
      pattern: "/^[A-Z][a-zA-Z'’-]*(?: [A-Z][a-zA-Z'’-]*)*$/",
    })
  ),
  password: t.Optional(
    t.String({
      minLength: 8,
      maxLength: 255,
      pattern: "/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/",
    })
  ),
});

type UpdateUserDto = typeof updateUserDto.static;

export { createUserDto, updateUserDto };
export type { CreateUserDto, UpdateUserDto };
