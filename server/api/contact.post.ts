import { defineEventHandler, readBody } from "#imports";
import { eq, or } from "drizzle-orm";
import { db } from "../database/db";
import { contacts, InsertContacts } from "../database/schema";

export default defineEventHandler(async (event) => {
  const {email, name, surname, tel} = await readBody<InsertContacts>(event);

  try {
    const exists = await db.select().from(contacts).where(
      or(
        eq(contacts.email, email), 
        eq(contacts.tel, tel)
      )
    ).limit(1);

    if (exists.length > 0) {
      return ({
        statusCode: 409,
        message: "Вы уже оставлили заявку"
      })
    }

    await db.insert(contacts).values({email, name, surname, tel});

    return ({statusCode: 200, message: 'Заявка создана'})
  } catch (error) {
      return ({statusCode: 500, message: 'Кажется, что-то пошло не так, попробуйте позже'})
  }
})