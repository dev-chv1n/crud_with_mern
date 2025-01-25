import React, { createContext, useReducer } from 'react'

export const WorkoutContext = createContext() //สร้าง context

export const workoutsReducer = (state, action) => {
    switch (action.type){
        case 'SET_WORKOUTS':
            return{
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return{
                workouts: [action.payload, ...state.workouts]  //payload ถูกเพิ่มเข้ามา ข้อมูลที่อยู่ใน state.workouts จะยังคงอยู่ใน array ต่อ
            }
        case 'DELETE_WORKOUT':
            return{
                //filter() จะทำการวนซ้ำ และสร้าง array เก็บข้อมูลที่ตรวจสอบแล้วว่า id ไม่ตรงกับ payload.id
                workouts: state.workouts.filter((w) => w._id !== action.payload._id) 
            }
        default:
            return state    
    }
}

export const WorkoutsContextProvider = ( { children } )=>{
    //useReducer ใช้จัดการ state โดยใช้ dispatch arg ตัวแรกคือ funcReducer ที่ใช้จัดการ argตัวที่สอง เป็นค่าเริ่มต้นของ state
    const [state, dispatch] = useReducer(workoutsReducer,{ 
        workouts: null
    })
    
    return(
        <WorkoutContext.Provider value={{...state, dispatch}}> 
            { children }
        </WorkoutContext.Provider>
    )
} 


