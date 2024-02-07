CREATE TABLE user_permission (
	id SERIAL PRIMARY KEY, 
	title varchar(32) NOT NULL,
	description text,
	active bool NOT NULL DEFAULT TRUE,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "user" (
	id SERIAL PRIMARY KEY,
	"name" varchar (50) NOT NULL, 
	email varchar(100) NOT NULL,
	permission_id int NOT NULL,
	password_hash varchar(255) NOT NULL,
	profile_picture varchar(16),
	active bool NOT NULL DEFAULT TRUE,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	FOREIGN KEY (permission_id) REFERENCES user_permission(id)
);

CREATE TABLE "event" (
	id SERIAL PRIMARY KEY,
	"name" varchar (50) NOT NULL, 
	start_time time NOT NULL,
	end_time time,
	cover text,
	img_url text,
	coffe_url text,
	happen_at timestamptz NOT NULL,
	registration_at timestamptz NOT NULL,
	active bool NOT NULL DEFAULT TRUE,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE user_event (
	user_id int NOT NULL,
	event_id int NOT NULL,
	FOREIGN KEY (user_id) REFERENCES "user"(id),
	FOREIGN KEY (event_id) REFERENCES "event"(id),
	CONSTRAINT unique_user_event UNIQUE (user_id, event_id)
)
