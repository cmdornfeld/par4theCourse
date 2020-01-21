const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware')


router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT "name", "holes", "location", "id" FROM "course";`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error GETTING course details:', error);
            res.sendStatus(500);
        });
});

module.exports = router;