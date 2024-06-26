const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

//THIS WORKS
router.get("/", rejectUnauthenticated, (req, res) => {
  console.log("/tasks GET route");

  let queryText = `SELECT * FROM "tasks";
    `;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get("/residents", rejectUnauthenticated, (req, res) => {
  console.log("tasks/residents GET route");

  let queryText = `SELECT * FROM "tasks_residents";`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

//THIS WORKS
router.put("/", rejectUnauthenticated, async (req, res) => {
  console.log("/tasks PUT route");
  // console.log('req params id log', req.params.id);
  console.log("is authenticated?", req.isAuthenticated);
  console.log("user", req.user);

  try {
    const result = await pool.query(
      `
        UPDATE "tasks_residents"
        SET "assistance_id" = $4, "date_time_completed" = NOW(), "user_id" = $3
        WHERE "resident_id" = $1 AND "tasks_id" = $2;
          `,
      [
        req.body.resident_id,
        req.body.tasks_id,
        req.user.id,
        req.body.assistance_id,
      ]
    );

    res.send(result.rows[0]);
    // const result = await pool.query(insertAllergiesQuery, insertAllergiesValues);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// test
router.put(
  "/:tasks_id/residents/:resident_id",
  rejectUnauthenticated,
  async (req, res) => {
    console.log("/tasks PUT route");
    // console.log('req params id log', req.params.id);
    console.log("is authenticated?", req.isAuthenticated);
    console.log("user", req.user);

    try {
      const result = await pool.query(
        `
        UPDATE "tasks_residents"
        SET "assistance_id" = $4, "date_time_completed" = NOW(), "user_id" = $3
        WHERE "resident_id" = $1 AND "tasks_id" = $2;
          `,
        [
          req.params.resident_id,
          req.params.tasks_id,
          req.user.id,
          req.body.assistance_id,
        ]
      );

      res.send(result.rows[0]);
      // const result = await pool.query(insertAllergiesQuery, insertAllergiesValues);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
);

router.get("/residents", rejectUnauthenticated, (req, res) => {
  console.log("/tasks/residents");
  console.log(req.params);

  let queryText = `SELECT * FROM "tasks_residents";`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// router.post('/', rejectUnauthenticated, async (req, res) => {
//     console.log('/tasks POST route')
//     // console.log('req params id log', req.params.id);
//     console.log('is authenticated?', req.isAuthenticated);
//     console.log('user', req.user);

//     try{
//         const result = await pool.query(`
//           INSERT INTO "tasks_residents"
//           ("resident_id", "tasks_id", "user_id", "assistance_id", "date_time_completed")
//           VALUES
//           ($1, $2, $3, $4, NOW());`, [req.body.resident_id, req.body.tasks_id, req.user.id, req.body.assistance_id]
//         )

//           res.send(result.rows[0]);
//           // const result = await pool.query(insertAllergiesQuery, insertAllergiesValues);
//   } catch (err) {
//       console.error(err);
//       res.sendStatus(500);
//   }

// })

module.exports = router;
