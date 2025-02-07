import { defineEventHandler, readBody } from "#imports";
import { eq } from "drizzle-orm";
import { db } from "~/server/database/db";
import { contacts } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);

  try {
    await db.delete(contacts).where(eq(contacts.id, id));
    return ({statusCode: 200});
  } catch (error) {
    return ({statusCode: 500, message: 'Кажется, что-то пошло не так, попробуйте позже'})
  }
})