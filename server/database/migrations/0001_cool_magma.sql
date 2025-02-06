CREATE TABLE "services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"tel" varchar(20) NOT NULL,
	"type" varchar(50) NOT NULL,
	CONSTRAINT "services_tel_unique" UNIQUE("tel")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"surname" varchar(50) NOT NULL,
	"login" varchar(50) NOT NULL,
	"email" varchar(50) NOT NULL,
	"passwordHash" varchar(255) NOT NULL,
	"isAdmin" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "contacts" ALTER COLUMN "surname" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "contacts" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "contacts" ALTER COLUMN "tel" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "contacts" ALTER COLUMN "email" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "contacts" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_idx" ON "sessions" USING btree ("user_id");--> statement-breakpoint
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_tel_unique" UNIQUE("tel");--> statement-breakpoint
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_email_unique" UNIQUE("email");