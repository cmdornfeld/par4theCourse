const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware')

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('logging req.body', req.body);
    
    const queryText = 'INSERT INTO "round" ("holes", "user_id", "course_id", "tee_id") VALUES ($1, $2, $3, $4) RETURNING id;';
    pool.query(queryText, [req.body.holes, req.body.user, req.body.course, req.body.tee])
      .then((result) => {console.log('logging', result)
      req.session.round = result.rows[0].id;
      res.sendStatus(201)})
      .catch((error) => {console.log('logging', error);
      res.sendStatus(500)});
});
      
router.get('/', (req, res) => {
  res.send({id: req.session.round});
});

router.delete('/:id', (req, res) => {
  console.log('logging req.params:', req.params);
  let queryText = `DELETE FROM "round" WHERE "round"."id" = $1;`
  pool.query(queryText, [req.params.id])
  .then(result => {
    res.sendStatus(201)})
    .catch((error) => {console.log('logging', error);
    res.sendStatus(500)});
})


module.exports = router;