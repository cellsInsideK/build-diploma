import { defineEventHandler } from "#imports";
import { asc, desc, eq, inArray } from "drizzle-orm";
import { db } from "~/server/database/db";
import { orderItems, orders, products, users } from "~/server/database/schema";

export default defineEventHandler(async (event) => {

  try {
    const userOrders = await db.select({orders: orders, user: users}).from(orders).innerJoin(users, eq(users.id, orders.userId)).orderBy(desc(orders.createdAt));

    const items = await db.select({
      orderItem: orderItems,
      product: products
    })
      .from(orderItems)
      .innerJoin(products, eq(products.id, orderItems.productId))
      .where(inArray(orderItems.cartId, userOrders.map(o => o.orders.id)));

    const result = userOrders.map(order => ({
      ...order,
      items: items.filter(oi => oi.orderItem.cartId === order.orders.id)
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