const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET workout notes for specific exercise
router.get('/', (req, res) => {
        let queryText = `SELECT * FROM "workout"`;
        pool.query(queryText).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});

module.exports = router;