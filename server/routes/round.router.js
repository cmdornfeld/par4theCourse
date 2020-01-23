const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware')


router.post('/', rejectUnauthenticated, async (req, res) => {
  console.log('logging req.body', req.body);
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const queryText = 'INSERT INTO "round" ("holes", "user_id", "course_id", "tee_id") VALUES ($1, $2, $3, $4) RETURNING id;';
    let result = await client.query(queryText, [req.body.holes, req.body.user, req.body.course, req.body.tee])
    console.log('logging', result)
    const roundId = result.rows[0].id;
    let holeQuery = `SELECT "id", "hole_course"."id" FROM "hole_course"
                      WHERE "hole_course"."course_id" = $1;`;
    result = await client.query(holeQuery, [req.body.course])
    for (let i = 0; i < result.rows.length && i < req.body.holes; i++) {
      let hole = result.rows[i];
      await client.query(`INSERT INTO "hole_user" ("hole_id", "round_id") VALUES ($1, $2);`, 
        [hole.id, roundId])
    }
    await client.query('COMMIT')
    res.send({id: roundId});
  }
  
  catch(error) {
    await client.query('ROLLBACK')
    console.log('logging', error);
    res.sendStatus(500)
  }

  finally {
    client.release()
  }
});
      
router.get('/:id', (req, res) => {
  console.log('logging req.session.round:', req.params.id);
  
  let queryText = `SELECT "hole_course"."number", "hole_course"."par", "score", "comments", "hole_user"."id", "hole_user"."round_id", "course"."name"
                  FROM "hole_user"
                  JOIN "round" ON "round"."id" = "hole_user"."round_id"
                  JOIN "hole_course" ON "hole_course"."id" = "hole_user"."hole_id"
                  JOIN "course" ON "course"."id" = "hole_course"."course_id"
                  WHERE "round"."id" = $1;`
  pool.query(queryText, [req.params.id])
    .then(result => {
      console.log('logging result from GET round by id:', result.rows);
      
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting hole info:', error);
      res.sendStatus(500);
    })
});

router.delete('/:id', (req, res) => {
  console.log('logging req.params:', req.params);
  let queryText = `DELETE FROM "round" WHERE "round"."id" = $1;`
  pool.query(queryText, [req.params.id])
  .then(result => {
    res.sendStatus(201)})
    .catch((error) => {console.log('logging', error);
    res.sendStatus(500)});
});


module.exports = router;