import {
  createUser,
} from "../repositories/user.repository.js";

export const createUserService = async (
  name,
  email,
  password
) => {

  // Later:
  // hash password

  const user = await createUser(
    name,
    email,
    password
  );

  return user;
};