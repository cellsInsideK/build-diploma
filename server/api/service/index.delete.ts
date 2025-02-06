import { defineEventHandler, readBody } from "#imports";
import { eq } from "drizzle-orm";
import { db } from "~/server/database/db";
import { services } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);

  try {
    await db.delete(services).where(eq(services.id, id));
    return ({statusCode: 200});
  } catch (error) {
    return ({statusCode: 500, message: 'Кажется, что-то пошло не так, попробуйте позже'})
  }
})