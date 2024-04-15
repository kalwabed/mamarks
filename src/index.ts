import { Hono } from 'hono'
import { env, getRuntimeKey } from "hono/adapter";

type Env = {
  TURSO_DATABASE_URL: string
  TURSO_AUTH_TOKEN: string
}

const app = new Hono<{ Bindings: Env }>()

app.get('/', (c) => {
  const envs = env(c)
  console.log(envs.TURSO_AUTH_TOKEN)
  return c.text(getRuntimeKey())
})

export default app
