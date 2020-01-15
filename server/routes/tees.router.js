const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    console.log(req.query);
    
    let queryText = `SELECT "teeColor"."name", "distance"
                    FROM "tees"
                    JOIN "teeColor" ON "teeColor"."id" = "tees"."color"
                    JOIN "course" ON "course"."id" = "tees"."course_id"
                    WHERE "course"."name" = $1`
    pool.query(queryText, [req.query.course])
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error GETTING tees:', error);
            res.sendStatus(500);
        });
});

module.exports = router;