import { WorkoutContext } from '../context/WorkoutContext';

import React ,{ useContext } from 'react';

export const UseWorkoutsContext = ()=>{
    const context = useContext(WorkoutContext)

    if(!context){
        throw Error("useWorkoutsContext must be used inside an WorloutsContextProvider")
    }

    return context
}