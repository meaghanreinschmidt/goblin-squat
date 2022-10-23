const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// GET exercise for exercises NOT YET COMPLETED
router.get("/", (req, res) => {
  console.log("/exercise GET route");
  console.log("is authenticated?", req.isAuthenticated());
  console.log("req.user", req.user);
  if (req.isAuthenticated()) {
    let queryText = `SELECT * FROM "exercise" WHERE "completed" = 'FALSE' AND "user_id" = $1`;
    pool
      .query(queryText, [req.user.id])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403); // Forbidden
  }
});

// GET COMPLETED exercise
router.get("/completed", (req, res) => {
  console.log("/exercise/completed GET route");
  console.log("is authenticated?", req.isAuthenticated());
  console.log("req.user", req.user);
  if (req.isAuthenticated()) {
    let queryText = `SELECT * FROM "exercise" WHERE "completed" = 'TRUE' AND "user_id" = $1`;
    pool
      .query(queryText, [req.user.id])
      .then((result) => {
        res.send(result.rows);
        console.log(result.rows);
      })
      .catch((error) => {
        console.log("Error: get completed exercise:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403); // Forbidden
  }
});

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

