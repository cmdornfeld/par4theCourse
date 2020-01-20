const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    pool.query(`SELECT "name", "holes", "location", "id" FROM "course";`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error GETTING course details:', error);
            res.sendStatus(500);
        });
});

router.get('/holes', (req, res) => {
    pool.query(`SELECT "number", "par", "hole_course"."id" FROM "hole_course"
                JOIN "course" ON "course"."id" = "hole_course"."course_id"
                WHERE "course"."id" = $1;`, [req.query.courseId])
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error GETTING holes details:', error);
            res.sendStatus(500);
        });
});

module.exports = router;