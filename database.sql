-- Change each Foreign Key to ON DELETE CASCADE --


CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "name" VARCHAR(80) NOT NULL DEFAULT '',
    "current_gym" VARCHAR(80) NOT NULL DEFAULT '',
    "favorite_lift" VARCHAR(80) NOT NULL DEFAULT ''
);

CREATE TABLE "workout" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(80) NOT NULL DEFAULT '',
	"completed" BOOLEAN DEFAULT 'false', 
	"completed_at" DATE DEFAULT '1111-11-11',
	"user_id" INT REFERENCES "user"
);

CREATE TABLE "exercise" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (25) NOT NULL DEFAULT '',
	"notes" TEXT NOT NULL DEFAULT '',
	"workout_id" INT REFERENCES "workout",
	"completed" BOOLEAN DEFAULT 'false'
);

CREATE TABLE "set" (
	"id" SERIAL PRIMARY KEY,
	"set_number" INT NOT NULL DEFAULT '0',
	"reps" INT NOT NULL DEFAULT '0',
	"weight" VARCHAR (25) NOT NULL DEFAULT '',
	"exercise_id" INT REFERENCES "exercise" 
);
	   