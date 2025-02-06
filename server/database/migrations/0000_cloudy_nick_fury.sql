CREATE TABLE "contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"surname" varchar(50),
	"name" varchar(50),
	"tel" varchar(20),
	"email" varchar(25)
);
