const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    pool.query(`SELECT "name", "holes", "id" FROM "course";`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error GETTING details:', error);
            res.sendStatus(500);
        });
});

router.get('/holes', (req, res) => {
    pool.query(`SELECT "number", "par" FROM "hole_course"
                JOIN "course" ON "course"."id" = "hole_course"."course_id";`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error GETTING details:', error);
            res.sendStatus(500);
        });
});

module.exports = router;