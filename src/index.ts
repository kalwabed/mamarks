import { Hono } from 'hono'
import { env } from "hono/adapter";
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
    return c.json({ data: allBookmarks })
  } catch (error) {
    console.error(error)
    return c.text("error")
  }
})

app.post("/", async c => {
  const body = await c.req.json()
  const { title, summary, url } = body
  const envs = env(c)
  const db = initDB(envs)

  const result = await db.insert(bookmarks).values({
    id: crypto.randomUUID(),
    title,
    summary,
    url,
  }).returning()

  return c.json({ data: result })
})

export default app
