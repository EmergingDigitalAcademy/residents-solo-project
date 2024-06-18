const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('/tasks GET route');
    

    let queryText = `SELECT * FROM "tasks"
    LEFT OUTER JOIN "assistance"
    ON "assistance"."id" = "tasks"."assistance_id";
    `;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

router.post('/', rejectUnauthenticated, async (req, res) => {
    console.log('/tasks POST route')
    // console.log('req params id log', req.params.id);
    console.log('is authenticated?', req.isAuthenticated);
    console.log('user', req.user);

    try{
        const result = await pool.query(`
          INSERT INTO "tasks_residents"
          ("resident_id", "tasks_id", "user_id", "assistance_id", "date_time_completed")
          VALUES
          ($1, $2, $3, $4, NOW());`, [req.body.resident_id, req.body.tasks_id, req.user.id, req.body.assistance_id]
        )

          res.send(result.rows[0]);
          // const result = await pool.query(insertAllergiesQuery, insertAllergiesValues);
  } catch (err) {
      console.error(err);
      res.sendStatus(500);
  }

})






module.exports = router;