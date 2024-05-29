import logo from './logo.svg';
import { Routes, Route } from "react-router-dom"
import Home from './Components/Home';
import Headers from './Components/Headers';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Error from './Components/Error';
import { useState } from 'react';
import { AppContext } from './contexts/AppContext';

function App() {
  const [userData, setuserData] = useState(undefined)
  return (
    <>
    <AppContext.Provider value={{userData, setuserData}}>
      
    <Headers />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='*' element={<Error />} />
    </Routes>
    </AppContext.Provider>
  </>
  );
}

export default App;
