import React, { useEffect, useState } from 'react'
import { IoCloseSharp } from "react-icons/io5"
import { UseWorkoutsContext } from '../hooks/UseWorkoutsContext'


const Modal = ({ modal, setModal, workout }) => {
    const API_PORT = import.meta.env.VITE_API_PORT
    const workoutId = workout._id
    const { dispatch } = UseWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState('')
    const emptyFields = []

    // setError('');
    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    
    const closeModal = () => {
        setModal(false);
        console.log(workout._id)
    };

    const handleSubmit = async (e) => {
        // e.preventDefault()
        
        
        try{
            const workout = { title, load, reps }

            const response = await fetch(`http://localhost:${API_PORT}/api/workouts/${workoutId}`, {
                method: 'PATCH',
                body: JSON.stringify(workout),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = response.json()
            
    
            if (response.ok) {
                if(error){
                    closeModal()
                }
                
            }
        }catch(err){
            console.log("Submit Error:",err)
        }

        

    }


    useEffect(() => {
        const fetchSingleWorkout = async () => {
            const response = await fetch(`http://localhost:${API_PORT}/api/workouts/${workoutId}`)
            const json = await response.json()
            console.log(json)

            setTitle(json.title)
            setLoad(json.load)
            setReps(json.reps)
        }

        fetchSingleWorkout()
    }, [])




    return (
        <>
            <div className="modal">
                <div className="modal-con">
                    <h2>Edit your workout</h2>

                    <form className="create" onSubmit={handleSubmit}>
                        <label >Exercise Title:</label>
                        <input type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={emptyFields.includes('title') ? "error" : ""}  //จะตรวจสอบว่า 'title' อยู่ใน array  
                        />

                        <label >Load (kg):</label>
                        <input type="number"
                            value={load}
                            onChange={(e) => setLoad(e.target.value)}
                            className={emptyFields.includes('load') ? "error" : ""}
                        />

                        <label >Reps:</label>
                        <input type="number"
                            value={reps}
                            onChange={(e) => setReps(e.target.value)}
                            className={emptyFields.includes('reps') ? "error" : ""}
                        />
                        <button disabled={emptyFields.length > 0} className={emptyFields.length > 0 ? 'button-disabled' : 's'} type="submit">Save & Update</button>
                        {emptyFields.length > 0 && <div className="warning">[Warning!] Please fill in all fields </div>} {/* ถ้ามี error จะ render */}
                    </form>

                    <span className="close-span" onClick={closeModal}><IoCloseSharp /></span>
                </div>
            </div>

        </>
    )
}

export default Modal