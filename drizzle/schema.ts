import { sql } from 'drizzle-orm'
import { text, sqliteTable, uniqueIndex, integer } from "drizzle-orm/sqlite-core";

export const bookmarks = sqliteTable("bookmarks", {
  id: text("id").notNull().unique().primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  url: text("url").notNull(),
  tags: text("tags"),
  createdAt: integer("created_at").default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at").default(sql`(strftime('%s', 'now'))`)
}, bookmark => ({
  titleIdx: uniqueIndex("title_idx").on(bookmark.title)
}))
