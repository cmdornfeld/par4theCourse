const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/round', (req, res, next) => {
    console.log('logging req.body', req.body);
    
  
    const queryText = 'INSERT INTO "round" ("user_id", "course_id", "tee_id") VALUES ($1, $2, $3) RETURNING id;';
    pool.query(queryText, [$1, $2, $3])
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500));
  });


module.exports = router;