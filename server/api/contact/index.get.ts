import { defineEventHandler } from "#imports";
import { db } from "../../database/db";
import { contacts,  } from "../../database/schema";

export default defineEventHandler(async () => {

  try {
    const res = await db.select().from(contacts)

    return ({statusCode: 200, data: res})
  } catch (error) {
      return ({statusCode: 500, message: 'Кажется, что-то пошло не так, попробуйте позже'})
  }
})