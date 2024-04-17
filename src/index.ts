import { Hono } from 'hono'
import { env, getRuntimeKey } from "hono/adapter";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { bookmarks } from './db/schema';

type Env = {
  TURSO_DATABASE_URL: string
  TURSO_AUTH_TOKEN: string
}

function initDB(env: Env) {
  const client = createClient({
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN
  })
  return drizzle(client)
}

const app = new Hono<{ Bindings: Env }>()

app.get('/', async (c) => {
  const envs = env(c)
  const db = initDB(envs)
  try {
    const allBookmarks = await db.select().from(bookmarks).all()
    console.log(allBookmarks)
    return c.text(getRuntimeKey())
  } catch (error) {
    console.error(error)
    return c.text("error")
  }
})

app.post("/", async c => {
  const envs = env(c)
  const db = initDB(envs)

  await db.insert(bookmarks).values({
    id: crypto.randomUUID(),
    title: "apakah real",
    summary: "ya",
    url: "https://ya",
  })
  return c.text("ok")
})

export default app
