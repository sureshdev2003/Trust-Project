CREATE TABLE "certificates" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"image" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
