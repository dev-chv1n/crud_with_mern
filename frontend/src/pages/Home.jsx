import { useEffect } from "react";
import { UseWorkoutsContext } from "../hooks/UseWorkoutsContext"

//components
import WorkoutsDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'


const Home = () => {
    const { workouts, dispatch } = UseWorkoutsContext()
    const PORT = process.env.PORT
    
    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch('http://localhost:${PORT}/api/workouts')
                const json = await response.json();
                if (response.ok) {
                    dispatch({ type: 'SET_WORKOUTS', payload: json })
                }
            } catch (error) {
                console.error('Error fetching workouts:', error.message)
            }
        };

        fetchWorkouts();
    }, []);

    return (
        <div className="container home">
            <div className="workouts">
                {workouts && workouts.map((items) => ( // ถ้า workouts เป็น null หรือ undefined จะไม่ .map ให้
                    <WorkoutsDetails key={items._id} workout={items} /> 
                ))}
            </div>
            <div className="workoutform">
                <WorkoutForm />
            </div>
        </div>
    )
}

export default Home;
