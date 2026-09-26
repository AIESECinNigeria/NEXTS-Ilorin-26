import { useState } from 'react'
import './App.css'
import { useNavigate } from "react-router-dom";
import FirstPage from './Registration/FirstPage/FirstPage'
import Registration from './Registration/Registration'

function App() {
  const navigate = useNavigate();
  const handleRegister = async () => {
    navigate("/registration/step-one");
  };

  return (
    <>
      Hello
      <button onClick={handleRegister} >Click to register</button>
    </>
  )
}

export default App
