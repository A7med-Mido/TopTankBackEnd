import { hash, compare } from "bcrypt"

// Hashing password
export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await hash(password, 10);
  return hashedPassword
};

// Verifying password
export const verifyPassword = async ({
  password,
  storedHash,
}: {
  password: string;
  storedHash: string;
}): Promise<boolean> => {

  return await compare(password, storedHash);
};