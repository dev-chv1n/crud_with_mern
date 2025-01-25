const express = require('express')
const {
        createWorkout,
        getAllWorkouts,
        getSingleWorkout,
        deleteWorkout,
        updateWorkout
      } = require('../controllers/workoutController')

const router = express.Router()


// GET All workuots
router.get('/', getAllWorkouts)

// GET a single workuots
router.get('/:id', getSingleWorkout)

//POST a new workout
router.post('/', createWorkout)

//DELETE a new workout
router.delete('/:id', deleteWorkout)

//UPDATE a new workout
router.patch('/:id',updateWorkout)


module.exports = router