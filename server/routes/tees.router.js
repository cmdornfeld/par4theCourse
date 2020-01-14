const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    let queryText = `SELECT "teeColor"."name", "distance"
                    FROM "tees"
                    JOIN "teeColor" ON "teeColor"."id" = "tees"."color"
                    JOIN "course" ON "course"."id" = "tees"."course_id";`
    pool.query(queryText)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error GETTING tees:', error);
            res.sendStatus(500);
        });
});

module.exports = router;