const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET request for a specific exercise
router.get('/:id', (req, res) => {
    if (req.isAuthenticated()) {
      console.log(req.params.id);
      const queryText = `SELECT *
                         FROM "exercise" 
                         JOIN "workout" ON "workout"."exercise_id" = "exercise"."id"
                         JOIN "set" ON "set"."exercise_id" = "exercise"."id"
                         WHERE "exercise"."id" = $1
                         GROUP BY "exercise"."id", "workout"."id", "set"."id";`
      pool.query(queryText, [req.params.id])
        .then((result) => {
          res.send(result.rows[0]);
        })
        .catch((err) => {
          console.log('Error: get one exercise', err);
          res.sendStatus(500);
        });
    }
  });

  module.exports = router;