import { defineEventHandler, readBody } from "#imports";
import { db } from "~/server/database/db";
import { orderItems, orders } from "~/server/database/schema";

type CreateCart = {
  userId: string, 
  tel: string,
  type: 'pickup' | 'courier',
  address: string,
  items: {id: string, quantity: number}[]
}

export default defineEventHandler(async (event) => {
  const {userId, tel, type, address, items} = await readBody<CreateCart>(event);

  try {
    const [orderCart] = await db.insert(orders).values({userId, tel, type, address, status: 'process'}).returning();

    const body = items.map(item => ({cartId: orderCart.id, productId: item.id, quantity: item.quantity}))
    const cartItems = await db.insert(orderItems).values(body);

    return ({
      statusCode: 200,
      message: 'Заказ создан'
    })
  }
  catch {
    return ({
      statusCode: 500,
      message: 'Не удалось создать заказ'
    })
  }
})