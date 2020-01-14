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

module.exports = router;