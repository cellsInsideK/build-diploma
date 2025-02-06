import { defineEventHandler, getRouterParam, } from "#imports";
import { eq, inArray } from "drizzle-orm";
import { db } from "~/server/database/db";
import { orderItems, orders, products } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'id');

  try {
    const userOrders = await db.select()
      .from(orders)
      .where(eq(orders.userId, userId!));

    const items = await db.select({
      orderItem: orderItems,
      product: products
    })
      .from(orderItems)
      .innerJoin(products, eq(products.id, orderItems.productId))
      .where(inArray(orderItems.cartId, userOrders.map(o => o.id)));

    const result = userOrders.map(order => ({
      ...order,
      items: items.filter(oi => oi.orderItem.cartId === order.id)
    }));

    return ({
      statusCode: 200,
      data: result
    })
  }
  catch {
    return ({
      statusCode: 500,
      message: 'Не удалось получить заказы'
    })
  }
})