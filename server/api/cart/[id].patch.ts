import { defineEventHandler, getRouterParam, readBody } from "#imports";
import { eq, sql } from "drizzle-orm";
import { db } from "~/server/database/db";
import { orderItems, orders, products, SelectOrders } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody<SelectOrders>(event);

  try {
    if (body.status === 'canceled') {
      const items = await db.select().from(orderItems).where(eq(orderItems.cartId, id!));

      items.forEach(async (item) => {
        await db.update(products).set({amount: sql`${products.amount} + ${item.quantity}`}).where(eq(products.id, item.productId!));
      })
    }

    const res =  await db.update(orders).set({...body, updatedAt: new Date()}).where(eq(orders.id, id!));

    return ({statusCode: 200, data: res});
  } catch (error) {
    return ({statusCode: 500, message: 'Кажется, что-то пошло не так, попробуйте позже'})
  }
})