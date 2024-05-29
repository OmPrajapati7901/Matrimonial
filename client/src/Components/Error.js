import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
    const navigate = useNavigate();
  return (
    <>
    <div className="text-center">
      <h1 className="text-2xl font-bold">Error</h1>
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" 
        onClick={() => navigate("/")}
      >
        Back To Home
      </button>
    </div>
  </>
  )
}

export default Error;