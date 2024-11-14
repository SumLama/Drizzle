CREATE TABLE `post` (
	`id` integer PRIMARY KEY NOT NULL,
	`content` text,
	`author_id` text
);
--> statement-breakpoint
CREATE TABLE `data` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
