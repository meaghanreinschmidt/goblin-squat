const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    if (req.isAuthenticated()) {
      console.log(req.params.id);
      const queryText = `SELECT * FROM "exercise" WHERE "completed" = 'TRUE' AND "id" = $1;`
      pool.query(queryText, [req.params.id])
        .then((result) => {
          res.send(result.rows[0]);
        })
        .catch((err) => {
          console.log('Error: get one complete exercise', err);
          res.sendStatus(500);
        });
    }
  });
  
module.exports = router;