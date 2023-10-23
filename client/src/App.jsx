import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import LoginForm from './components/Forms/LoginForm'
import RegistrationForm from './components/Forms/RegistrationForm'

import './App.css'

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/registration' element={<RegistrationForm />} />
        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </Router>
  )
}

export default App
