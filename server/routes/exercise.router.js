const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET exercise name for home page/previous exercise
router.get('/', (req, res) => {
  console.log('/exercise GET route');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('req.user', req.user);
  if (req.isAuthenticated()) {
    let queryText = `SELECT "exercise"."name" FROM "exercise" WHERE "user_id" = $1`;
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

// POST exercise to home page
router.post('/', (req, res) => {
  // POST route code here
});

// DELETE exercise 
router.delete('/:id', (req, res) => {
  // DELETE route code here
});

module.exports = router;
