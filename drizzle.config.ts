import type { Config } from "drizzle-kit";

export default {
  out: './migrations',
  schema: './src/db/schema.ts',
  breakpoints: true,
  driver: "turso",
} satisfies Config
