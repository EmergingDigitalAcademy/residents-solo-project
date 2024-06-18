const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", rejectUnauthenticated, (req, res) => {
  console.log("/resident GET route");
  console.log("is authenticated?", req.isAuthenticated());
  console.log("user", req.user);
  let queryText = `SELECT "image", "first_name", "last_name", "birthday", "term", "status", "discharge_date", "admitted_date", "hall", "floor", "housing"."room_number", 
    "allergies"."type"
    FROM "residents"
    LEFT OUTER JOIN "housing"
    ON "housing"."resident_id" = "residents"."id"
    LEFT OUTER JOIN "resident_allergies"
    ON "resident_allergies"."resident_id" = "residents"."id"
    LEFT OUTER JOIN "allergies"
    ON "resident_allergies"."allergies_id" = "allergies"."id";
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

router.post("/", rejectUnauthenticated, async (req, res) => {
  console.log(req.body);
  console.log("/residents POST route");
  console.log("is authenticated", req.isAuthenticated());

  try {
    // Now handle the genre reference:
    const insertResidentQuery = `
              INSERT INTO "residents" 
                ("users_id", "image", "first_name", "last_name", "birthday", "term")
                VALUES
                ($1, $2, $3, $4, $5, $6) RETURNING "id";
            `;
    const insertResidentValues = [
      req.user.id,
      req.body.image,
      req.body.first_name,
      req.body.last_name,
      req.body.birthday,
      req.body.term,
    ];
    const result = await pool.query(insertResidentQuery, insertResidentValues);
    console.log("new resident id", result.rows[0].id);

    const residentId = result.rows[0].id;

    //query 2: use residentID to POST to transaction_residents (creates a log)
    const logType = 5;
    const query2 = `
        INSERT INTO "transaction_residents" ("transaction_id", "resident_id", "date")
        VALUES ($1, $2, NOW());
        `;

    await pool.query(query2, [logType, residentId]);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/resident_allergies", rejectUnauthenticated, async (req, res) => {
  console.log("/residents/residents_allergies POST route");
  console.log("req params id log", req.params.id);
  console.log("is authenticated?", req.isAuthenticated);
  console.log("user", req.user);
  console.log("req body allergies_id[0]", req.body.allergies_id);

  try {
    const insertAllergies = await pool.query(
      `
            INSERT INTO "resident_allergies"
            ("resident_id", "allergies_id")
            VALUES
            ($1, $2);`,
      [req.body.resident_id, req.body.allergies_id]
    );

    res.send(insertAllergies.rows[0]);
    // const result = await pool.query(insertAllergiesQuery, insertAllergiesValues);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.put("/housing", rejectUnauthenticated, async (req, res) => {
  console.log("/residents/housing PUT route");
  // req.body should be:  {room_number: '2', resident_id: '32'}
  // console.log('req params id log', req.params.id);
  console.log("is authenticated?", req.isAuthenticated);
  console.log("user", req.user);
  console.log(req.body);

  //first query:
  /*
      `
            UPDATE "housing"
            SET "resident_id" = NULL
            WHERE "resident_id" = $1;`
    */
  //first thing to do: check if room_number has a resident_id already assigned
  // if it does, then first find the room_number that has the resident currently assinged to.
  // set the resident_id to NULL.
  try {
    await pool.query(
      `
        UPDATE "housing"
        SET "resident_id" = NULL
        WHERE "resident_id" = $1;`,
      [req.body.resident_id]
    );

    //this query updates new room
    await pool.query(
      `
            UPDATE "housing"
            SET "resident_id" = $2
            WHERE "room_number" = $1;`,
      [req.body.room_number, req.body.resident_id]
    );
    //query to creates a log
    const logType = 3;
    const query2 = `
           INSERT INTO "transaction_residents" ("transaction_id", "resident_id", "previous", "current", "date")
           VALUES ($1, $2, (SELECT "room_number" FROM "housing" WHERE "resident_id" = $3), $4, NOW());
           `;

    await pool.query(query2, [logType, req.body.resident_id, req.body.resident_id, req.body.room_number]);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post("/transaction", rejectUnauthenticated, async (req, res) => {
  console.log("/transaction/residents");
  console.log("is authenticated?", req.isAuthenticated());
  console.log("user", req.user);
  console.log(req.body);

  try {
    const { transaction_id, resident_id } = req.body;

    // Insert into transaction_residents
    await pool.query(
      `
            INSERT INTO "transaction_residents" ("transaction_id", "resident_id")
            VALUES ($1, $2)
            ON CONFLICT DO NOTHING;
            `,
      [transaction_id, resident_id]
    );

    await pool.query(
      `
            UPDATE "transaction_residents"
            SET "date" = NOW()
            WHERE "transaction_id" = $1 AND "resident_id" = $2 AND "date" IS NULL;
            `,
      [transaction_id, resident_id]
    );

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;

module.exports = router;

// router.post("/housing/:id", rejectUnauthenticated, async (req, res) => {
//     console.log('/residents/housing/:id POST route');
//     console.log('req params id log', req.params.id);
//     console.log('is authenticated?', req.isAuthenticated);
//     console.log('user', req.user);

//     try{
//           const insertHousing = await pool.query( `
//             INSERT INTO "housing"
//             ("resident_id", "assigned_date", "unassigned_date")
//             VALUES
//             ($1, $2, $3);`, [
//                 req.params.id,
//                 req.body.assigned_date,
//                 req.body.unassigned_date]
//           )
//             // const insertHousingValues = [
//             //     req.params.id,
//             //     req.body.room_number,
//             //     req.body.floor,
//             //     req.body.hall,
//             //     req.body.assigned_date,
//             //     req.body.unassigned_date
//             // ]

//             res.send(insertHousing.rows[0]);
//     } catch (err) {
//         console.error(err);
//         res.sendStatus(500);
//     }
// })
