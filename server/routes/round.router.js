const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    console.log('logging req.body', req.body);
    
    const queryText = 'INSERT INTO "round" ("holes", "user_id", "course_id", "tee_id") VALUES ($1, $2, $3, $4) RETURNING id;';
    pool.query(queryText, [req.body.holes, req.body.user, req.body.course, req.body.tee])
      .then((result) => {console.log('logging', result)
      res.send(result).status(201)})
      .catch((error) => {console.log('logging', error);
       res.sendStatus(500)});
  });


module.exports = router;