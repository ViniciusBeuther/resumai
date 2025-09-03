import React from 'react'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import ProtectedRoute from './components/ProtectedRoutes';

const App : React.FC = () => {
  const NotFound = "not found";

  return (
    <Router>
      <Routes>
        <Route path='/login' element={ <Login /> } />
        
        <Route path='/' element={ 
          <ProtectedRoute>
            <Home /> 
          </ProtectedRoute>
          } />
        <Route path='*' element={ NotFound } />
      </Routes>
    </Router>
  )
}

export default App
