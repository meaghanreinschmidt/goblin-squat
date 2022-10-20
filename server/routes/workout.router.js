const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET workout notes 
router.get('/', (req, res) => {
    console.log('/workout GET route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('req.user', req.user);
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM "workout" WHERE "exercise_id" = $1`;
        pool.query(queryText, [req.user.id]).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;