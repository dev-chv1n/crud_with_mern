const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')


// get all workouts
const getAllWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({ createAt: -1 }) // find all and sort createAt high to low
        res.status(200).json(workouts)
        console.log(workouts)
    }
    catch (error) {
        console.log("[ERROR!!] Get all workouts error : ", error)
        res.status(400).json({ error: error.message })
    }
}
// get a single workout
const getSingleWorkout = async (req, res) => {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) { // Check id is ObjectId or not
        res.status(404).json({ msg: "id is not ObjectId" })
    }

    try {
        const workout = await Workout.findById(id)

        if (!workout) {
            console.log("No such workout")
            return res.status(400).json({ msg: 'No such workout' })
        }
        console.log(workout)
        res.status(200).json(workout)
    }
    catch (error) {
        console.log("[ERROR!!] Get a single workout error : ", error)
        res.status(400).json({ error: error.message })
    }
}

// create new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body

    const emptyFields = []

    if (!title) {
        emptyFields.push("title")
    }
    if (!load) {
        emptyFields.push("load")
    }
    if (!reps) {
        emptyFields.push("reps")
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all field',  emptyFields})
    }
    


    // add doc to db
    try {
        const workout = await Workout.create({ title, load, reps })
        res.status(200).json(workout)
        console.log(workout)
    }
    catch (error) {
        console.log("[ERROR!!] Post new workout error : ", error)
        res.status(400).json({ error: error.message })
    }
}
// delete a workout
const deleteWorkout = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ msg: "id is not objectId" });
    }
    try {
        const workout = await Workout.findByIdAndDelete(id);

        if (!workout) {
            return res.status(404).json({ msg: "Workout not found" });
        }

        res.status(200).json(workout);
    } catch (error) {
        console.log("[ERROR!!] Delete workout error: ", error);
        res.status(500).json({ msg: "Delete workout error" });
    }
};

// update a workout
const updateWorkout = async (req, res) => {
    const id = req.params.id


    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ msg: "id is not objectId" });
    }

    try {
        const workout = await Workout.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        )
        console.log(workout)
        res.status(200).json(workout);
    } catch (error) {
        console.log("[ERROR!!] Update workout error", error)
        res.status(500).json({ msg: "Update workout error" });
    }
}


module.exports = {
    createWorkout,
    getAllWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
} 