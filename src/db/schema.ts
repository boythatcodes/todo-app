import { sql } from 'drizzle-orm';
import { mysqlTable, int, varchar, text, boolean, mysqlEnum, datetime } from 'drizzle-orm/mysql-core';

export const users = mysqlTable("users", {
  id: int('id').primaryKey().autoincrement(),
  
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  password: text('password').notNull(),

  emailVerified: boolean('email_verified').default(false),
  emailVerificationCode: varchar('email_verificaiton_code', { length: 8 }).notNull(),
  
  status: mysqlEnum('status', ['admin', 'user', 'blocked']).default('user').notNull(),
  
  created_at: datetime('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});


export const sessions = mysqlTable("sessions", {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: int('user_id').references(() => users.id),
  sessionToken: varchar('session_token', { length: 255 }).unique().notNull(),
  expires: datetime('expires').notNull(),
  createdAt: datetime('created_at').default(new Date()),
})