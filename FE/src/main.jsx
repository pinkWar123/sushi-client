import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './index.css'
import Dashboard from './dashboard/Dashboard.jsx'
import Footer from './partials/Footer.jsx'
import Header from './partials/Header.jsx'
import BackToTop from './partials/BackToTop.jsx'

import Login from './account/login/Login.jsx'
import Register from './account/register/Register.jsx'
import Confirm from './confirm/Confirm.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={
          <>
            <Header />
            <Dashboard />
            <Footer />
            <BackToTop />
          </>
        } />
        <Route path='/login' element={<Login />} />

      </Routes>

    </Router>
  </StrictMode>,
)
