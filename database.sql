-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- Scripts start
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR (80) UNIQUE NOT NULL,
  "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "course" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR (120) UNIQUE NOT NULL,
  "location" VARCHAR (120) NOT NULL,
  "holes" INT
);

CREATE TABLE "round" (
  "id" SERIAL PRIMARY KEY,
  "date" TIMESTAMP DEFAULT NOW() NOT NULL,
  "holes" INT,
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
  "score" INT,
  "comments" VARCHAR (280),
  "round_id" INT REFERENCES "round"
);

-- populating the teeColor table with data
INSERT INTO "teeColor" ("name") VALUES ('Red'), ('Gold'), ('White'), ('Blue'), ('Black');

-- populating the course table with data
INSERT INTO "course" ("name", "location", "holes") VALUES ('The Ponds at Battle Creek', 'Maplewood', '9'), 
('Highland National Golf Course', 'Saint Paul', '18');
INSERT INTO "course" ("name", "location", "holes") VALUES ('White Eagle Golf Club', 'Hudson', '18');
INSERT INTO "course" ("name", "location", "holes") VALUES ('River Oaks Golf Course', 'Cottage Grove', '18');
INSERT INTO "course" ("name", "location", "holes") VALUES ('Goodrich Golf Course', 'Maplewood', '18');
INSERT INTO "course" ("name", "location", "holes") VALUES ('Eagle Valley Golf Course', 'Woodbury', '18');


-- populating the tees table with data
INSERT INTO "tees" ("color", "distance", "course_id") VALUES (1, '1773', 1), (2, '2336', 1), (3, '2613', 1), (4, '2815', 1), (5, '3023', 1);
INSERT INTO "tees" ("color", "distance", "course_id") VALUES (1, '5125', 2), (2, '5843', 2), (3, '6196', 2), (5, '6638', 2);
INSERT INTO "tees" ("color", "distance", "course_id") VALUES (1, '4995', 3), (2, '5784', 3), (3, '6240', 3), (4, '6711', 3), (5, '7178', 3);
INSERT INTO "tees" ("color", "distance", "course_id") VALUES (1, '5165', 4), (2, '5597', 4), (3, '5956', 4), (4, '6418', 4);
INSERT INTO "tees" ("color", "distance", "course_id") VALUES (1, '5076', 5), (2, '5076', 5), (3, '5944', 5), (4, '6259', 5);
INSERT INTO "tees" ("color", "distance", "course_id") VALUES (1, '5207', 6), (3, '6158', 6), (4, '6554', 6), (5, '6892', 6);


-- populating the hole_course table with data
INSERT INTO "hole_course" ("number", "par", "course_id") VALUES ('1', '4', 1), ('2', '3', 1), ('3', '5', 1), ('4', '3', 1), ('5', '5', 1),
 ('6', '3', 1), ('7', '5', 1), ('8', '3', 1), ('9', '4', 1);
INSERT INTO "hole_course" ("number", "par", "course_id") VALUES ('1', '4', 2), ('2', '4', 2), ('3', '4', 2), ('4', '3', 2), ('5', '5', 2),
 ('6', '5', 2), ('7', '4', 2), ('8', '3', 2), ('9', '4', 2), ('10', '5', 2), ('11', '4', 2), ('12', '5', 2), ('13', '4', 2), ('14', '3', 2),
  ('15', '4', 2), ('16', '3', 2), ('17', '4', 2), ('18', '4', 2);
INSERT INTO "hole_course" ("number", "par", "course_id") VALUES ('1', '4', 3), ('2', '4', 3), ('3', '3', 3), ('4', '5', 3), ('5', '3', 3),
 ('6', '4', 3), ('7', '4', 3), ('8', '4', 3), ('9', '5', 3), ('10', '3', 3), ('11', '5', 3), ('12', '4', 3), ('13', '3', 3), ('14', '4', 3),
  ('15', '4', 3), ('16', '5', 3), ('17', '4', 3), ('18', '4', 3);

-- Scripts end


-- Example queries
-- gives the total score of a round, as well as where the round took place, the round ID, and the name of the player
SELECT SUM("hole_user"."score") score, "course"."name", "hole_user"."round_id", "users"."username"
FROM "round"
JOIN "course" ON "course"."id" = "round"."course_id"
JOIN "hole_user" ON "hole_user"."round_id" = "round"."id"
JOIN "users" ON "users"."id" = "round"."user_id"
WHERE "users"."id" = 1
GROUP BY "course"."id", "hole_user"."round_id", "users"."username", "round"."date"
ORDER BY "date" DESC;

-- another example of above, without as much info
SELECT SUM(h.score), h.round_id FROM "round" r
JOIN users u ON u.id = r.user_id
JOIN hole_user h ON h.round_id = r.id
GROUP BY h.round_id;

-- Get courses - Can display name and includes the amount of holes (does not display the number)
SELECT "name", "holes" FROM "course";

-- Get tees for specific course - displays color and distance
SELECT "teeColor"."name", "distance", "tees"."id" FROM "tees"
JOIN "teeColor" ON "teeColor"."id" = "tees"."color"
JOIN "course" ON "course"."id" = "tees"."course_id"
WHERE "course"."id" = 1;

-- Get all holes for specific course - display hole number and par
SELECT "number", "par", "hole_course"."id" FROM "hole_course"

-- JOIN "course" ON "course"."id" = "hole_course"."course_id"
WHERE "hole_course"."course_id" = 1;

-- Get # of holes for specific round
SELECT "course"."holes", "round"."date" FROM "course"
JOIN "round" ON "round"."course_id" = "course"."id";

-- Get hole #, hole par, user score, user comments and user hole id for a specific round
SELECT "hole_course"."number", "hole_course"."par", "score", "comments", "hole_user"."id", "course"."name"
FROM "hole_user"
JOIN "round" ON "round"."id" = "hole_user"."round_id"
JOIN "hole_course" ON "hole_course"."id" = "hole_user"."hole_id"
JOIN "course" ON "course"."id" = "hole_course"."course_id"
WHERE "round"."id" = 1;

-- Delete entire round by id
DELETE FROM "round" WHERE "round"."id" = 1;

-- Get hole #, hole par, user score, user comments for a specific round
SELECT "hole_course"."number", "hole_course"."par", "score", "comments"
FROM "hole_user"
JOIN "round" ON "round"."id" = "hole_user"."round_id"
JOIN "hole_course" ON "hole_course"."id" = "hole_user"."hole_id"
WHERE "round"."id" = 1;

-- update score and comments of a specific hole for a user
UPDATE "hole_user" SET "score" = 4, "comments" = 'nice par' WHERE "id" = 1;

-- provide total par and total score of a specific round
SELECT SUM("hole_course"."par") par, SUM("hole_user"."score") score
FROM "hole_course"
JOIN "hole_user" ON "hole_user"."hole_id" = "hole_course"."id"
WHERE "hole_user"."round_id" = 1;
