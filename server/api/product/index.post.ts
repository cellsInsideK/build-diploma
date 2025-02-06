import { defineEventHandler, readBody } from "#imports"
import { db } from "~/server/database/db";
import { products } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const res = await db.insert(products).values({name: body.name, price: body.price, type: body.type, imageName: body.imageName});

    return ({statusCode: 200, message: 'Товар создан'});
  }
  catch {
    return ({statusCode: 500, message: 'Не удалось создать товар'})
  }
})