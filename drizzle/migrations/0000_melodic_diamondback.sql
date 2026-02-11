CREATE TABLE "admin" (
	"id" serial PRIMARY KEY NOT NULL,
	"password_hash" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "news" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"image_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sponsors" (
	"id" serial PRIMARY KEY NOT NULL,
	"image_url" text NOT NULL,
	"name" text NOT NULL,
	"link" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
