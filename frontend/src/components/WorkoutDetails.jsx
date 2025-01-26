import { useEffect, useState } from "react"
import { MdDeleteOutline } from 'react-icons/md'
import { FaRegEdit } from "react-icons/fa"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import { UseWorkoutsContext } from "../hooks/UseWorkoutsContext"
import Modal from "./Modal"

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = UseWorkoutsContext()
    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

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
                <div className="detail-box">
                    <h3>{workout.title}</h3>
                    <p><strong>Reps:</strong> {workout.reps}</p>
                    <p><strong>Load:</strong> {workout.load} kg</p>
                    <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
                </div>
                <div className="span-box">
                    <span className="edit-span" onClick={toggleModal}><FaRegEdit /></span>
                    <span className="del-span" onClick={delWorkout}><MdDeleteOutline /></span>
                </div>
            </div>

            {modal && <Modal modal={modal} setModal={setModal} workout={workout} />}
        </>
    )
}


export default WorkoutDetails