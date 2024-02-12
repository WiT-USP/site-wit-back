CREATE TABLE "permission" (
	id SERIAL PRIMARY KEY, 
	title varchar(32) NOT NULL,
	description text,
	active bool NOT NULL DEFAULT TRUE,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "user" (
	id SERIAL PRIMARY KEY,
	"name" varchar (60) NOT NULL, 
	email varchar(60) NOT NULL,
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
	"name" varchar (60) NOT NULL,
	description text,
	cover text,
	galery_url text,
	coffee_payment_url text,
	coffee_value decimal(10,2),
	"start_date" timestamptz NOT NULL,
	"end_date" timestamptz NOT NULL,
	active bool NOT NULL DEFAULT TRUE,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "activity" (
	id SERIAL PRIMARY KEY,
	event_id int NOT NULL,
	"name" varchar(60) NOT NULL,
	description text,
	"subject" varchar(60),
	responsible varchar(60),
	certificated bool NOT NULL DEFAULT FALSE,
	"start_time" timestamptz NOT NULL,
	"end_time" timestamptz NOT NULL,
	registration_at timestamptz NOT NULL,
	active bool NOT NULL DEFAULT TRUE,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	FOREIGN KEY (event_id) REFERENCES "event"(id),
);

CREATE TABLE "certificate" (
	id SERIAL PRIMARY KEY,
	activity_id int NOT NULL,
	workeload int NOT NULL,
	description text,
	tenplate text,
	active bool NOT NULL DEFAULT TRUE,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	FOREIGN KEY (activity_id) REFERENCES "activity"(id),
);

CREATE TABLE "user_activity" (
	id SERIAL PRIMARY KEY,
	user_id int NOT NULL,
	activity_id int NOT NULL,
	coffee bool NOT NULL,
	certificated bool NOT NULL DEFAULT FALSE,
	visible bool NOT NULL DEFAULT TRUE,
	active bool NOT NULL DEFAULT TRUE,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	FOREIGN KEY (activity_id) REFERENCES "activity"(id),
);

CREATE TABLE "user_activity_certificate" (
	user_activity_id int NOT NULL,
	certificate_id int NOT NULL,
	active bool NOT NULL DEFAULT TRUE,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	FOREIGN KEY (certificate_id) REFERENCES "certificate"(id),
	FOREIGN KEY (user_activity_id) REFERENCES "user_activity"(id),
	CONSTRAINT user_activity_certificate_id UNIQUE (certificate_id, user_activity_id)
);
