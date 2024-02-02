CREATE TABLE "user" (
	id SERIAL PRIMARY KEY,
	"name" varchar (50) NOT NULL, 
	email varchar(100) NOT NULL,
	password_hash varchar(255) NOT NULL,
	active bool NOT NULL DEFAULT TRUE,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now()
)
