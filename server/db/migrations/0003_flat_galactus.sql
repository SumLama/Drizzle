ALTER TABLE `user` RENAME COLUMN "name" TO "first_name";--> statement-breakpoint
ALTER TABLE `user` ADD `last_name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `address` text NOT NULL;