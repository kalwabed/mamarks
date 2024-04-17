CREATE TABLE `bookmarks` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`summary` text NOT NULL,
	`url` text NOT NULL,
	`tags` text,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bookmarks_id_unique` ON `bookmarks` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `title_idx` ON `bookmarks` (`title`);