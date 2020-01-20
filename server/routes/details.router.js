const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware')

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);
    let queryText = `SELECT SUM("hole_user"."score") score, "course"."name", "hole_user"."round_id", "users"."username"
                    FROM "round"
                    JOIN "course" ON "course"."id" = "round"."course_id"
                    JOIN "hole_user" ON "hole_user"."round_id" = "round"."id"
                    JOIN "users" ON "users"."id" = "round"."user_id"
                    WHERE "users"."id" = $1
                    GROUP BY "course"."name", "hole_user"."round_id", "users"."username";`
    pool.query(queryText, [req.user.id])
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error GETTING details:', error);
            res.sendStatus(500);
        });
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT "hole_course"."number", "hole_course"."par", "score", "comments", "round"."id"
                    FROM "hole_user"
                    JOIN "round" ON "round"."id" = "hole_user"."round_id"
                    JOIN "hole_course" ON "hole_course"."id" = "hole_user"."hole_id"
                    WHERE "round"."id" = $1;`
    pool.query(queryText, [req.params.id])
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log('Error GETTING round details:', error);
            res.sendStatus(500);
        })
})

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('logging req.body', req.body);
    const queryText = 'INSERT INTO "hole_user" ("hole_id", "score", "comments", "round_id") VALUES ($1, $2, $3, $4);';
    pool.query(queryText, [req.body.hole, req.body.score, req.body.comments, req.body.roundId])
      .then(result => {
      res.sendStatus(201)})
      .catch((error) => {console.log('logging', error);
      res.sendStatus(500)});
});

module.exports = router;