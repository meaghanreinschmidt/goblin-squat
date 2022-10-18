
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "exercise" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (25),
	"user_id" INT REFERENCES "user"
);

CREATE TABLE "workout" (
	"id" SERIAL PRIMARY KEY,
	"exercise_id" INT REFERENCES "exercise",
	"completed_at" TIMESTAMP, 
	"notes" TEXT
);

CREATE TABLE "set" (
	"id" SERIAL PRIMARY KEY,
	"set_number" INT,
	"reps" INT,
	"weight" VARCHAR (25),
	"workout_id" INT REFERENCES "workout" 
);

INSERT INTO "exercise" ("name", "user_id")
VALUES ('Bench Press', '1'), ('Front Squat', '1'), ('Mile Run', '1');

INSERT INTO "workout" ("exercise_id", "notes")
VALUES ('1', '1st set was light, maxed out on 2nd rep of 3rd set'),
	   ('2', 'Easy lift today, knee pain'), 
	   ('3', '10:30 time');
	   
INSERT INTO "set" ("set_number", "reps", "weight", "workout_id")
VALUES ('1', '10', '85', '1'),
	   ('2', '10', '95', '1'),
	   ('3', '10', '105', '1'),
	   ('1', '7', '65', '2'),
	   ('2', '7', '70', '2'),
	   ('3', '7', '75', '2');
	   