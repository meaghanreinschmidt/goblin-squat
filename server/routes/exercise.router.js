const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET exercise for exercises NOT YET COMPLETED
router.get('/', (req, res) => {
  console.log('/exercise GET route');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('req.user', req.user);
  if (req.isAuthenticated()) {
    let queryText = `SELECT * FROM "exercise" WHERE "completed" = 'FALSE' AND "user_id" = $1`;
    pool.query(queryText, [req.user.id]).then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403); // Forbidden
  }
});


// GET COMPLETED execise 
router.get('/completed', (req, res) => {
  console.log('/completed/exercise GET route');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('req.user', req.user);
  if (req.isAuthenticated()) {
    let queryText = `SELECT * FROM "exercise" WHERE "completed" = 'TRUE' AND "user_id" = $1`;
    pool.query(queryText, [req.user.id]).then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403); // Forbidden
  }
});

// PUT (edit) exercise
router.put('/', (req, res) => {
  // PUT route code here
});

// PUT (complete) exercise
router.put('/completed/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `UPDATE "exercise" SET "completed" = 'TRUE', "completed_at" = CURRENT_DATE
                       WHERE "user_id" = $1;`;
    pool.query(queryText, [req.body.completed, req.body.completed_at, req.params.id, req.user.id]).then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
})

// POST exercise to home page
router.post('/', async (req, res) => {
  if (req.isAuthenticated()) {
    const db = await pool.connect();
      try {
        if (req.isAuthenticated()) {
          await db.query('BEGIN');
          const queryText = `INSERT INTO "exercise" ("name", "user_id")
                             VALUES ($1, $2) RETURNING "id"`;
          const result = await db.query(queryText, [req.body.name, req.user.id]);
          const query2 = `INSERT INTO "workout" ("exercise_id", "notes")
                          VALUES ($1, $2)`;
          await db.query(query2, [req.user.id, result.rows[0].id]);
          const sets = req.body;
            for (let i = 0; i < sets.length; i += 1) {
              let queryText = `INSERT INTO "sets" ("set_number", "reps", "weight", "workout_id")
                               VALUES ($1, $2, $3, $4);`;
              await db.query(queryText, [i, sets[i].reps, sets[i].weight, sets[i].workout_id]);
            }
          await db.query('COMMIT');
          res.sendStatus(201);
        } else {
          res.sendStatus(403); // Forbidden
        }
      } catch (e) {
        await db.query('ROLLBACK');
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
router.delete('/:id', (req, res) => {
  // DELETE route code here
});

module.exports = router;
