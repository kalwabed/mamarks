import { Hono } from "hono";
import { env } from "hono/adapter";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { drizzle } from "drizzle-orm/libsql";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { createClient } from "@libsql/client";
import { logger } from "hono/logger";
import { cache } from "hono/cache";
import { bookmarks } from "./db/schema";
import { checkToken } from "./helpers/auth";

type Env = {
	TURSO_DATABASE_URL: string;
	TURSO_AUTH_TOKEN: string;
	ACCESS_TOKEN: string;
};

function initDB(env: Env) {
	if (!env.TURSO_AUTH_TOKEN || !env.TURSO_DATABASE_URL) {
		throw new HTTPException(500, {
			message: "TURSO_AUTH_TOKEN & TURSO_DATABASE_URL is required!",
		});
	}

	const client = createClient({
		url: env.TURSO_DATABASE_URL,
		authToken: env.TURSO_AUTH_TOKEN,
	});
	return drizzle(client);
}

const app = new Hono<{ Bindings: Env }>();

app.use(cors());
app.use(logger());

app.use(async (c, next) => {
	const token = c.req.header("X-Token");
	const envs = env(c);
	checkToken(token, envs.ACCESS_TOKEN);
	await next();
});

app.get(
	"*",
	cache({
		cacheName: "marks-me",
		cacheControl: "max-age=3600", // 1 hour
	}),
);

app.get("/", async (c) => {
	const envs = env(c);
	const db = initDB(envs);
	try {
		const allBookmarks = await db.select().from(bookmarks).all();
		return c.json({ data: allBookmarks });
	} catch (error) {
		throw new HTTPException(500, { cause: error });
	}
});

app.post(
	"/",
	zValidator(
		"json",
		z.object({
			title: z.string(),
			summary: z.string(),
			url: z.string().url(),
			tags: z.string().array().optional(),
		}),
	),
	async (c) => {
		const body = await c.req.json();
		const { title, summary, url } = body;
		const envs = env(c);
		const db = initDB(envs);

		const result = await db
			.insert(bookmarks)
			.values({
				id: crypto.randomUUID(),
				title,
				summary,
				url,
			})
    	.returning();
  
		return c.json({ data: result });
	},
);

export default app;
