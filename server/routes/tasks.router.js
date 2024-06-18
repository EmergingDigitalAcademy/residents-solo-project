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

    try {
        // Now handle the genre reference:
        const insertTasksQueries = `
                INSERT INTO "tasks" 
                  ("users_id", "resident_id" )
                  VALUES
                  ($1, $2);
              `;
        const insertTasksValues = [
          req.user.id,
          req.body.resident_id,
        ];
      const result = await pool.query(insertTasksQueries, insertTasksValues);
      // const result2 = await pool.query(insertHousingQuery, insertHousingValues);
      res.sendStatus(201);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }

    router.put('/:id', rejectUnauthenticated, async (req, res) => {
        console.log('/tasks PUT route');
        console.log('req params id log', req.params.id);
        console.log('is authenticated?', req.isAuthenticated);
        console.log('user', req.user);
    
        try{
            const result = await pool.query(
                `
                UPDATE "tasks"
                SET "" = $1
                FROM ""
                WHERE ;`,
                [req.body]
            );
            res.send(result.rows[0]);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    })

})






module.exports = router;