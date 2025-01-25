import { UseWorkoutsContext } from "../hooks/UseWorkoutsContext"
import { MdDeleteOutline } from 'react-icons/md'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = UseWorkoutsContext()

    const delWorkout = async () => {
        const response = await fetch('http://localhost:4000/api/workouts/' + workout._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
        }

    }

    return (
        <>
            <div className="workout-detail">
                <h3>{workout.title}</h3>
                <p><strong>Reps:</strong> {workout.reps}</p>
                <p><strong>Load:</strong> {workout.load} kg</p>
                <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix:true })}</p>
                <span onClick={delWorkout}><MdDeleteOutline /></span>
            </div>
        </>
    )
}


export default WorkoutDetails