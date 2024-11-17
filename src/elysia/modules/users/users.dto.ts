import { t } from "elysia";

const createUserDto = t.Object({
  username: t.String({ minLength: 5, maxLength: 255 }),
  name: t.String({ minLength: 5, maxLength: 255 }),
  password: t.String({ minLength: 8, maxLength: 255 }),
});

type CreateUserDto = typeof createUserDto.static;

const updateUserDto = t.Object({
  username: t.Optional(t.String({ minLength: 5, maxLength: 255 })),
  name: t.Optional(t.String({ minLength: 5, maxLength: 255 })),
  password: t.Optional(t.String({ minLength: 8, maxLength: 255 })),
});

type UpdateUserDto = typeof updateUserDto.static;

export { createUserDto, updateUserDto };
export type { CreateUserDto, UpdateUserDto };
