import { boolean, index, integer, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', {length: 50}).notNull(),
  surname: varchar('surname', {length: 50}).notNull(),
  login: varchar('login', {length: 50}).notNull(),
  email: varchar('email', {length: 50}).unique().notNull(),
  passwordHash: varchar('passwordHash', {length: 255}).notNull(),
  isAdmin: boolean('isAdmin').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type InsertUsers = typeof users.$inferInsert;
export type SelectUsers = typeof users.$inferSelect;

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  userIdx: index('user_idx').on(table.userId),
}));

export type InsertSessions = typeof sessions.$inferInsert;
export type SelectSessions = typeof sessions.$inferSelect;

export const contacts = pgTable('contacts', {
  id: uuid('id').primaryKey().defaultRandom(),
  surname: varchar('surname', {length: 50}).notNull(),
  name: varchar('name', {length: 50}).notNull(),
  tel: varchar('tel', {length: 20}).notNull().unique(),
  email: varchar('email', {length: 50}).notNull().unique(),
})

export type InsertContacts = typeof contacts.$inferInsert;
export type SelectContacts = typeof contacts.$inferSelect;

export const services = pgTable('services' , {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', {length: 50}).notNull(),
  tel: varchar('tel', {length: 20}).notNull().unique(),
  type: varchar('type', {length: 50}).notNull(),
  createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
});

export type InsertServices = typeof services.$inferInsert;
export type SelectServices = typeof services.$inferSelect;

export const productTypeEnum = pgEnum('product_type', ['cement', 'microcement', 'cement-mix']);

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', {length: 100}).notNull(),
  price: integer('price').notNull(),
  imageName: varchar('image_name', {length:100}).notNull(),
  type: productTypeEnum().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export type InsertProduct = typeof products.$inferInsert;
export type SelectProduct = typeof products.$inferSelect;

export const orderTypeEnum = pgEnum('order_type', ['courier', 'pickup']);
export const orderStatusEnum = pgEnum('order_status', ['process', 'completed', 'accepted', 'canceled'])

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, {onDelete: 'cascade'}),
  tel: varchar('tel', {length: 20}).notNull(),
  type: orderTypeEnum().notNull(),
  status: orderStatusEnum().notNull(),
  address: varchar('address', {length: 100}).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type InsertOrders = typeof orders.$inferInsert;
export type SelectOrders = typeof orders.$inferSelect;

export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  cartId: uuid('cart_id').references(() => orders.id, {onDelete: 'cascade'}),
  productId: uuid('product_id').references(() => products.id, {onDelete: 'cascade'}),
  quantity: integer('quantity').notNull(),
});

export type InsertOrderItems = typeof orderItems.$inferInsert;
export type SelectOrderItems = typeof orderItems.$inferSelect;



