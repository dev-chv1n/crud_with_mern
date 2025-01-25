import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import { WorkoutsContextProvider } from './context/WorkoutContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <WorkoutsContextProvider>  {/* //ทำให้ทุก components ใน App เข้าถึง context นี้ได้ */}
      <App />
    </WorkoutsContextProvider>
  </StrictMode>
)
