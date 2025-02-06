import { defineEventHandler, readBody } from "#imports";
import { eq } from "drizzle-orm";
import { db } from "~/server/database/db";
import { InsertServices, services } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const {name, type, tel} = await readBody<InsertServices>(event);

  try {
    const exists = await db.select().from(services).where(
        eq(services.tel, tel)
    ).limit(1);

    if (exists.length > 0) {
      return ({
        statusCode: 409,
        message: "Вы уже оставлили заявку"
      })
    }

    await db.insert(services).values({ name, type, tel});

    return ({statusCode: 200, message: 'Заявка создана'})
  } catch (error) {
    return ({statusCode: 500, message: 'Кажется, что-то пошло не так, попробуйте позже'})
  }
})