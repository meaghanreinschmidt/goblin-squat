const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET workout NOT YET COMPLETED
router.get("/", (req, res) => {
    console.log("/workout GET route");
    console.log("is authenticated?", req.isAuthenticated());
    console.log("req.user", req.user);
    if (req.isAuthenticated()) {
      let queryText = `SELECT * FROM "workout"
                       WHERE "completed" = 'FALSE' AND "user_id" = $1`;
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

// GET COMPLETED workout
router.get("/completed", (req, res) => {
    console.log("/workout/completed GET route");
    console.log("is authenticated?", req.isAuthenticated());
    console.log("req.user", req.user);
    if (req.isAuthenticated()) {
      let queryText = `SELECT * FROM "workout" 
                       JOIN "exercise" ON "exercise"."id" = "workout"."exercise_id"
                       WHERE "workout"."completed" = 'TRUE' AND "exercise"."user_id" = $1`;
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

// // GET workout notes for specific exercise
// router.get('/:id', (req, res) => {
//         let queryText = `SELECT "workout"."notes" FROM "workout"
//                          JOIN "exercise" ON "exercise"."id" = "workout"."exercise_id"
//                          WHERE "exercise"."id" = $1`;
//         pool.query(queryText, [req.params.id]).then((result) => {
//             console.log('in workout router', result.rows);
//             res.send(result.rows);
//         }).catch((error) => {
//             console.log('ERROR: getting workout notes', error);
//             res.sendStatus(500);
//         });
// });

// router.get('/completed/:id', (req, res) => {
//     console.log('/workout/completed/:id')
//     let queryText = `SELECT "exercise"."name" FROM "workout"
//                      JOIN "exercise" ON "exercise"."id" = "workout"."exercise_id"
//                      WHERE "exercise"."id" = $1`;
//     pool.query(queryText, [req.params.id]).then((result) => {
//         console.log('in workout router', result.rows);
//         res.send(result.rows);
//     }).catch((error) => {
//         console.log('ERROR: getting exercise name', error);
//         res.sendStatus(500);
//     });
// });

router.get('/completed/:id', (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.params.id);
    const queryText = `SELECT * FROM "exercise" WHERE "id" = $1;`
    pool.query(queryText, [req.params.id])
      .then((result) => {
        res.send(result.rows[0]);
      })
      .catch((err) => {
        console.log('Error: getting completed workout exercises', err);
        res.sendStatus(500);
      });
  }
});

module.exports = router;