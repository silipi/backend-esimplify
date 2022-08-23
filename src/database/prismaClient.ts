import { PrismaClient, Prisma } from '@prisma/client';

const prismaClient = new PrismaClient();

export function excludeFields<T, K extends keyof T>(fields: T, omit: K[]) {
  const result: Partial<Record<keyof T, boolean>> = {};
  for (const key in fields) {
    if (!omit.includes(key as any)) {
      result[key] = true;
    }
  }
  return result;
}

export default prismaClient;
