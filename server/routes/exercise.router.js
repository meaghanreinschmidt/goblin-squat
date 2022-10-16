const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET request for active exercises
router.get('/', (req, res) => {
  const query = `SELECT * FROM "movies" WHERE "id" = $1`;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    }).catch(err => {
      console.log('ERROR: Get active exercises', err);
      res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
