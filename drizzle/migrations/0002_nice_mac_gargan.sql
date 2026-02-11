CREATE TABLE "donations" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"amount" text NOT NULL,
	"pan_card" text NOT NULL,
	"transaction_id" text NOT NULL,
	"proof_image_url" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
