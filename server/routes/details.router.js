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

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;