const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET workout notes for specific exercise
router.get('/:id', (req, res) => {
        let queryText = `SELECT "workout"."notes" FROM "workout"
                         JOIN "exercise" ON "exercise"."id" = "workout"."exercise_id"
                         WHERE "exercise"."id" = $1`;
        pool.query(queryText, [req.params.id]).then((result) => {
            console.log('in workout router', result.rows);
            res.send(result.rows);
        }).catch((error) => {
            console.log('ERROR: getting workout notes', error);
            res.sendStatus(500);
        });
});

router.get('/completed/:id', (req, res) => {
    let queryText = `SELECT "workout"."notes" FROM "workout"
                     JOIN "exercise" ON "exercise"."id" = "workout"."exercise_id"
                     WHERE "exercise"."id" = $1`;
    pool.query(queryText, [req.params.id]).then((result) => {
        console.log('in workout router', result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log('ERROR: getting workout notes', error);
        res.sendStatus(500);
    });
});

module.exports = router;