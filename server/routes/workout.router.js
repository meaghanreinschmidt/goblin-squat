const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GOOD AND WORKING
// GET active workout on home page
router.get('/', (req, res) => {
    // console.log("/workout GET route");
    // console.log("is authenticated?", req.isAuthenticated());
    // console.log("req.user", req.user);
    if (req.isAuthenticated()) {
      let queryText = `SELECT * FROM "workout"
                       WHERE "workout"."completed" = 'FALSE' AND "workout"."user_id" = $1`;
      pool
        .query(queryText, [req.user.id])
        .then((result) => {
          res.send(result.rows);
        })
        .catch((error) => {
          console.log(error);
          res.sendStatus(500);
        });
    } else {
      res.sendStatus(403); // Forbidden
    }
  });

// GET completed workout on workout log
router.get('/completed', (req, res) => {
  console.log("/workout/completed GET route");
  console.log("is authenticated?", req.isAuthenticated());
  console.log("req.user", req.user);
  if (req.isAuthenticated()) {
    let queryText = `SELECT * FROM "workout" 
                     WHERE "workout"."completed" = 'TRUE' AND "workout"."user_id" = $1`;
    pool
      .query(queryText, [req.user.id])
      .then((result) => {
        res.send(result.rows);
        console.log(result.rows);
      })
      .catch((error) => {
        console.log("Error: get completed exercise:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403); // Forbidden
  }
});

// GOOD AND WORKING
// GET active workout details on click
router.get('/:id', (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `SELECT * FROM "workout" WHERE "id" = $1 AND "user_id" = $2`;
    pool.query(queryText, [req.params.id, req.user.id])
      .then((result) => {
        res.send(result.rows[0]);
      })
      .catch((err) => {
        console.log('ERROR: Get one workout', err);
        res.sendStatus(500);
      })
  }
})

// GET completed workout details on click
router.get('/completed/details/:id', (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `SELECT * FROM "workout" WHERE "id" = $1`;
    pool.query(queryText, [req.params.id])
      .then((result) => {
        res.send(result.rows[0]);
      })
      .catch((err) => {
        console.log('ERROR: Get one workout', err);
        res.sendStatus(500);
      })
  }
})

// GOOD AND WORKING
// PUT (complete workout)
router.put('/complete/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `UPDATE "workout" SET "completed" = 'TRUE', "completed_at" = CURRENT_DATE
                       WHERE "user_id" = $1 AND "id" = $2;`;
    pool
      .query(queryText, [req.user.id, req.params.id])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

//GOOD AND WORKING
// POST workout to home page
router.post('/', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `INSERT INTO "workout" ("name", "user_id")
                       VALUES ($1, $2);`;
    pool.query(queryText, [req.body.name, req.user.id])
    .then((result) => {
      res.sendStatus(200);
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  };
});

// GOOD AND WORKING
// DELETE workout 
router.delete('/delete/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `DELETE FROM "set" WHERE "exercise_id" = $1 AND "id" = $2;`;
     pool.query(queryText, [req.params.id, req.params.id])
     .then((result) => {
       const queryText2 = `DELETE FROM "exercise" WHERE "workout_id" = $1 AND "id" = $2;`;
       pool.query(queryText2, [req.params.id, req.params.id])
       .then((result) => {
         const queryText3 = `DELETE FROM "workout" WHERE "id" = $1 AND "user_id" = $2;`;
         pool.query(queryText3, [req.params.id, req.user.id])
         .then((result) => {
           res.sendStatus(200);
         }).catch((error) => {
           console.log('error in delete from workout', error);
           res.sendStatus(500);
         });
       }).catch((error) => {
         console.log(error);
         res.sendStatus(500);
       });
     }).catch((error) => {
       console.log(error);
       res.sendStatus(500);
     });
   } else {
     res.sendStatus(403);
   }
});


module.exports = router;