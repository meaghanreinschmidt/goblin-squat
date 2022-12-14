const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const name = req.body.name;
  const current_gym = req.body.current_gym;
  const favorite_lift = req.body.favorite_lift;

  const queryText = `INSERT INTO "user" (username, password, name, current_gym, favorite_lift)
    VALUES ($1, $2, $3, $4, $5) RETURNING id`;
  pool
    .query(queryText, [username, password, name, current_gym, favorite_lift])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

// Edit Profile
router.put('/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `UPDATE "user" SET "name" = $1, "current_gym" = $2, "favorite_lift" = $3
                       WHERE "id" = $4`;
    pool.query(queryText, [req.body.name, req.body.current_gym, req.body.favorite_lift, req.params.id])
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

router.get('/all', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT * FROM "user";`
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      res.sendStatus(500);
    });
});

module.exports = router;
