# Mamarks

Simple service to communicate between services to my public personal [bookmarks](https://www.kalwabed.com/bookmarks). Still **WIP**.

## Tech
- Hono
- Drizzle
- Turso
- Cloudflare Workers

## How it works

The idea is that I can consume them on [my web page](https://www.kalwabed.com/bookmarks).

## Usage
### Install
```sh
pnpm install
```

**Make sure you already have the required environment files: `wrangler.toml` and `.env`**
```sh
# you can just copy the examples.
cp .env.example .env
cp wrangler.example.toml wrangler.toml
```

- `TURSO_DATABASE_URL`: Your Turso database URL.
- `TURSO_AUTH_TOKEN`: Your Turso auth token.
- (optional) `ACCESS_TOKEN`: Your preferred access token to prevent others from having access. Leave it blank, or you don't need to set it if you want everyone to be able to access it.

> `.env` it's just for migrating and generating schema from the database.

### Run locally
```sh
pnpm run dev
```
You can access it via http://localhost:8000.

### Deploy
Deploy it via Cloudflare Workers.

```sh
pnpm run deploy
```

[Learn more](https://developers.cloudflare.com/workers/wrangler/commands/#deploy).

## License
MIT
