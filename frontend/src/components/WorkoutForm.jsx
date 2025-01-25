import { useState } from "react"
import { UseWorkoutsContext } from "../hooks/UseWorkoutsContext";


const WorkoutForm = ()=> {
    const { dispatch } = UseWorkoutsContext()

    const [ title , setTitle ] = useState('') 
    const [ load , setLoad ] = useState('') 
    const [ reps , setReps ] = useState('') 
    const [ error , setError ] = useState('') 
    const [ emptyFields , setEmptyfields ] = useState([]) 
  
    const handleSubmit = async (e) => {
        e.preventDefault() // ป้องกันไม่ให้ฟอร์มส่งคำขอ HTTP และรีเฟรชหน้า

        const workout = { title, load, reps}

        const response = await fetch('http://localhost:4000/api/workouts',{
            method: 'POST',
            body: JSON.stringify(workout), //แปลง object เป็น string ให้ body
            headers: {
                'Content-Type': 'application/json'// ระบุว่า body เป็น JSON
            }
        })

        const json = await response.json()

        if(response.ok){
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyfields([])
            console.log("new workout added", json)
            console.log("res", response)
            dispatch({ type: 'CREATE_WORKOUT', payload: json})
        }
        else if(!response.ok){
            setError(json.error)
            setEmptyfields(json.emptyFields)
        }

    }
        

    return(
        <>
            <h2>Add a new workout</h2>
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

                <button type="submit">Add Workout</button>
                {error && <div className="warning">[Warning!] {error} </div>} {/* ถ้ามี error จะ render */}
            </form>
        </>
    )
}


export default WorkoutForm