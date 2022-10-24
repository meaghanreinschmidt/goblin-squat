const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// GET exercise names on workout details
router.get('/:id', (req, res) => {
  // console.log("/exercise GET route");
  // console.log("is authenticated?", req.isAuthenticated());
  // console.log("req.user", req.user);
  if (req.isAuthenticated()) {
    let queryText = `SELECT "exercise"."name", "exercise"."id" FROM "exercise"
                     JOIN "workout" ON "workout"."id" = "exercise"."workout_id"
                     WHERE "workout"."id" = $1 AND "workout"."user_id" = $2`;
    pool
      .query(queryText, [req.params.id, req.user.id])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('ERROR: get exercises', error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403); // Forbidden
  }
});

// GET exercise details
router.get('/details/:id', (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `SELECT * FROM "exercise" WHERE "id" = $1`;
    pool.query(queryText, [req.params.id])
      .then((result) => {
        res.send(result.rows[0]);
      })
      .catch((err) => {
        console.log('ERROR: Get one exercise details', err);
        res.sendStatus(500);
      })
  }
})


// PUT (complete) exercise
router.put("/complete/:id", (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `UPDATE "exercise" SET "completed" = 'TRUE', "completed_at" = CURRENT_DATE
                       WHERE "user_id" = $1 AND WHERE "id" = $2;`;
    pool
      .query(queryText, [req.user.id, req.params.id])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

// POST exercise to home page
router.post("/", async (req, res) => {
  if (req.isAuthenticated()) {
    const db = await pool.connect();
    try {
      if (req.isAuthenticated()) {
        await db.query("BEGIN");
        const queryText = `INSERT INTO "exercise" ("name", "user_id", "notes")
                             VALUES ($1, $2, $3) RETURNING "id"`;
        const result = await db.query(queryText, [
          req.body.name,
          req.user.id,
          req.body.notes,
        ]);
        const exerciseId = result.rows[0].id;

        const sets = req.body.sets;
        for (let i = 0; i < sets.length; i += 1) {
          let queryText = `INSERT INTO "sets" ("set_number", "reps", "weight", "exercise_id")
                               VALUES ($1, $2, $3, $4, $5);`;
          await db.query(queryText, [
            i,
            sets[i].reps,
            sets[i].weight,
            exerciseId,
          ]);
        }
        await db.query("COMMIT");
        res.sendStatus(201);
      } else {
        res.sendStatus(403); // Forbidden
      }
    } catch (e) {
      await db.query("ROLLBACK");
      console.log(e);
      res.sendStatus(500);
    } finally {
      db.release();
    }
  } else {
    res.sendStatus(403); // Forbidden
  }
});

// DELETE exercise
router.delete("/delete/:id", (req, res) => {
  console.log("in exercise DELETE /delete/:id");
  if (req.isAuthenticated()) {
    const queryText = `DELETE FROM "set"
    WHERE "exercise_id" = $1;`;
    pool
      .query(queryText, [req.params.id])
      .then((result) => {
        const setQueryText = `DELETE FROM "exercise" WHERE "id" = $1 AND "user_id" = $2;`;
        pool
          .query(setQueryText, [req.params.id, req.user.id])
          .then((result) => {
            res.sendStatus(200);
          })
          .catch((error) => {
            console.log("error in delete from exercise", error);
            res.sendStatus(500);
          });
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;

