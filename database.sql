-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "course" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR (120) UNIQUE NOT NULL,
  "location" VARCHAR (120) NOT NULL
);

CREATE TABLE "round" (
  "id" SERIAL PRIMARY KEY,
  "date" DATE,
  "user_id" INT REFERENCES "users",
  "course_id" INT REFERENCES "course",
  "tee_id" INT REFERENCES "tees"
);
 
CREATE TABLE "tees" (
  "id" SERIAL PRIMARY KEY,
  "color" INT REFERENCES "teeColor",
  "distance" INT NOT NULL,
  "course_id" INT REFERENCES "course"
);
 
CREATE TABLE "teeColor" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR (20)
);
 
CREATE TABLE "hole_course" (
  "id" SERIAL PRIMARY KEY,
  "number" INT NOT NULL,
  "par" INT NOT NULL,
  "course_id" INT REFERENCES "course"
);
 
CREATE TABLE "hole_user" (
  "id" SERIAL PRIMARY KEY,
  "hole_id" INT REFERENCES "hole_course",
  "score" INT NOT NULL,
  "comments" VARCHAR (280),
  "round_id" INT REFERENCES "round"
);

INSERT INTO "teeColor" ("name") VALUES ('Red'), ('Gold'), ('White'), ('Blue'), ('Black');

INSERT INTO "course" ("name", "location") VALUES ('The Ponds at Battle Creek', 'Maplewood'), 
('Highland National Golf Course', 'Saint Paul');

INSERT INTO "tees" ("color", "distance", "course_id")
VALUES (1, '1773', 1), (2, '2336', 1), (3, '2613', 1), (4, '2815', 1), (5, '3023', 1);

INSERT INTO "tees" ("color", "distance", "course_id")
VALUES (1, '5125', 2), (2, '5843', 2), (3, '6196', 2), (5, '6638', 2);

INSERT INTO "hole_course" ("number", "par", "course_id")
VALUES ('1', '4', 1), ('2', '3', 1), ('3', '5', 1), ('4', '3', 1),
('5', '5', 1), ('6', '3', 1), ('7', '5', 1), ('8', '3', 1), ('9', '4', 1);

INSERT INTO "hole_course" ("number", "par", "course_id")
VALUES ('1', '4', 2), ('2', '4', 2), ('3', '4', 2), ('4', '3', 2),
('5', '5', 2), ('6', '5', 2), ('7', '4', 2), ('8', '3', 2), ('9', '4', 2),
('10', '5', 2), ('11', '4', 2), ('12', '5', 2), ('13', '4', 2), ('14', '3', 2),
('15', '4', 2), ('16', '3', 2), ('17', '4', 2), ('18', '4', 2);