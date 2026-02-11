CREATE TABLE "ads" (
	"id" serial PRIMARY KEY NOT NULL,
	"image_url" text NOT NULL,
	"link" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
