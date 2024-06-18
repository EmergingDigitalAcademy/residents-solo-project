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

router.put('/:id', rejectUnauthenticated, async (req, res) => {
    console.log('/tasks/:id PUT route')
    console.log('req params id log', req.params.id);
    console.log('is authenticated?', req.isAuthenticated);
    console.log('user', req.user);

    try{
        const result = await pool.query(
            `
            UPDATE "tasks"
            SET "assistance_id" = $1, "date_time_completed" = NOW(), "resident_id" = $3
            FROM "residents"
            WHERE "tasks"."resident_id" = "residents"."id" AND "residents"."id" = $2;`,
            [req.body.assistance_id, req.params.id, req.body.resident_id]
        );
        res.send(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
})






module.exports = router;