import { defineEventHandler, getRouterParam } from "#imports"
import { eq } from "drizzle-orm";
import { db } from "~/server/database/db";
import { products } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  try {
    const [res] = await db.select().from(products).where(eq(products.id, id!));

    return ({
      statusCode: 200,
      data: res,
    })
  }
  catch {
    return ({statusCode: 500, message: 'Не удалось получить данные'});
  }
})