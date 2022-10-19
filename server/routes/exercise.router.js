const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET exercise name for exercises NOT YET COMPLETED
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

// GET COMPLETED execise name and completed_at date
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
router.post('/', (req, res) => {
  // POST route code here
});

// DELETE exercise 
router.delete('/:id', (req, res) => {
  // DELETE route code here
});

module.exports = router;
