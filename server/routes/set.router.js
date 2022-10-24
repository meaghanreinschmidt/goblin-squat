const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET sets for specific exercise
router.get('/:id', (req, res) => {
        let queryText = `SELECT "set"."set_number", "set"."reps", "set"."weight" FROM "set"
                         JOIN "exercise" ON "exercise"."id" = "set"."exercise_id"
                         WHERE "exercise"."id" = $1`;
        pool.query(queryText, [req.params.id]).then((result) => {
            console.log('in set router', result.rows);
            res.send(result.rows);
        }).catch((error) => {
            console.log('ERROR: getting sets', error);
            res.sendStatus(500);
        });
});

// router.get('/completed/:id', (req, res) => {
//     let queryText = `SELECT "set"."set_number", "set"."reps", "set"."weight" FROM "set"
//                      JOIN "exercise" ON "exercise"."id" = "set"."exercise_id"
//                      WHERE "exercise"."id" = $1`;
//     pool.query(queryText, [req.params.id]).then((result) => {
//         console.log('in set router', result.rows);
//         res.send(result.rows);
//     }).catch((error) => {
//         console.log('ERROR: getting completed sets', error);
//         res.sendStatus(500);
// });   
// })

module.exports = router;