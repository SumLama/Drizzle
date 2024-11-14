CREATE TABLE `course` (
	`id` integer PRIMARY KEY NOT NULL,
	`course_name` text
);
--> statement-breakpoint
CREATE TABLE `student` (
	`id` integer PRIMARY KEY NOT NULL,
	`std_name` text,
	`grade` text
);
--> statement-breakpoint
CREATE TABLE `student_to_course` (
	`std_id` integer NOT NULL,
	`course_id` integer NOT NULL,
	FOREIGN KEY (`std_id`) REFERENCES `student`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON UPDATE no action ON DELETE no action
);
