import { defineEventHandler, readBody } from "#imports";
import { eq } from "drizzle-orm";
import { db } from "~/server/database/db";
import { products } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const {id, createdAt, ...body} = await readBody(event);

  try {
    const res =  await db.update(products).set({...body, updatedAt: new Date()}).where(eq(products.id, id));

    return ({statusCode: 200, message: 'Товар обновлен',});
  } catch (error) {
    console.log(error);
    return ({statusCode: 500, message: 'Кажется, что-то пошло не так, попробуйте позже'})
  }
})