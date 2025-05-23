import { defineConfig } from "drizzle-kit";


export default defineConfig({
  dialect: "mysql",
  schema: "./src/db/schema.ts",
  out: "drizzle/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL!, 
  },
  breakpoints: true, 
});