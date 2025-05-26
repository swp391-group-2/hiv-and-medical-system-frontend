import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from '../pages/DefaultLayout'
import LandingPage from '../pages/DefaultLayout/landingPage'
import LoginPage from '../pages/loginPage'
import RegisterPage from '../pages/registerPage'

const RoutesApp = () => {
  return (
    <Routes>
        <Route path="/" element={<DefaultLayout />}>
            <Route index element={<LandingPage />} />
           <Route path="login" element={<LoginPage />} />
           <Route path="register" element={<RegisterPage />} />
        </Route>
    </Routes>
  )
}

export default RoutesApp