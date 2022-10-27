const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// GOOD
// GET exercise for Add Exercise
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `SELECT "exercise"."workout_id", "exercise"."name", "exercise"."notes", "set"."set_number", "set"."reps", "set"."weight" FROM "exercise"
                     JOIN "set" ON "set"."exercise_id" = "exercise"."id"
                     WHERE "exercise"."id" = $1;`;
    pool.query(queryText, [req.params.id]).then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);``
  }
})

// GOOD
// GET exercise names on ACTIVE workout details DELETES exercises
router.get('/:id', (req, res) => {
  // console.log("/exercise GET route");
  // console.log("is authenticated?", req.isAuthenticated());
  console.log("req.user", req.user.id);
  console.log('req params', req.params.id);

  if (req.isAuthenticated()) {
    let queryText = `SELECT "exercise"."name", "exercise"."id", "exercise"."workout_id" FROM "exercise"
                     LEFT JOIN "workout" ON "workout"."id" = "exercise"."workout_id"
                     WHERE "workout"."id" = $1 AND "workout"."user_id" = $2`;
    pool
      .query(queryText, [req.params.id, req.user.id])
      .then((result) => {
        console.log(result.rows);
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

router.get('/completed/:id', (req, res) => {
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

// GOOD
// GET exercise details on click
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

// PUT edit exercise
router.put('/edit/:id/:id', (req, res) => {
  console.log('in /edit/:id/:id', req.body);
  const queryText = `UPDATE "exercise" SET "name" = $1, "notes" = $2, "workout_id" = $3
                    WHERE "id" = $4;`;
  pool.query(queryText, [req.body.exerciseName.name, req.body.notesField, req.body.workout_id, req.body.exercise_id])
    .then(results => {
      res.sendStatus(200);
    }).catch(error => {
      console.log('ERROR: editing exercise', error);
      res.sendStatus(500);
    })
})


// GOOD DON'T MESS UP
// PUT mark exercise complete
router.put('/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `UPDATE "exercise" SET "completed" = 'TRUE' WHERE "id" = $1;`
    pool.query(queryText, [req.params.id])
      .then(() => {
        res.sendStatus(200);
      }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403); // Forbidden
  }
});


// POST exercise to home page
router.post("/", async (req, res) => {
  if (req.isAuthenticated()) {
    const db = await pool.connect();
    try {
      if (req.isAuthenticated()) {
        await db.query("BEGIN");
        // INSERT exercise into workout - HOW DO I TARGET workout_id
        const queryText1 = `INSERT INTO "exercise" ("name", "notes", "workout_id")
                          VALUES ($1, $2, $3) 
                          RETURNING "id"`;
        const result = await db.query(queryText1, [
          req.body.name,
          req.body.notes,
          req.body.workout_id
        ]);
        const exerciseId = result.rows[0].id;
        const set = req.body.sets;
        for (let i = 0; i < set.length; i += 1) {
          let queryText2 = `INSERT INTO "set" ("set_number", "reps", "weight", "exercise_id")
                               VALUES ($1, $2, $3, $4);`;
          await db.query(queryText2, [
            set[i].set_number,
            set[i].reps,
            set[i].weight,
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
router.delete('/delete/:id', (req, res) => {
  console.log("in exercise DELETE /delete/:id");
  if (req.isAuthenticated()) {
    const queryText = `DELETE FROM "set" WHERE "exercise_id" = $1;`;
    pool
      .query(queryText, [req.params.id])
      .then((result) => {
        const queryText1 = `DELETE FROM "exercise" WHERE "id" = $1;`;
        pool
          .query(queryText1, [req.params.id])
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

