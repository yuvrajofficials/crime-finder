import React from 'react'
import Login from './components/Auth/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard'
import { ThemeProvider } from './context/ThemeContext'
import AuthCheck from './components/Auth/AuthCheck'
import Register from './components/Auth/Register'
import Logout from './components/Auth/LogOut'
import NotificationsView from './components/Dashboard/NotificationsView'

const App = () => {
  return (
    <>
      <ThemeProvider>

        <BrowserRouter>

          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot' element={<Register />} />
            <Route element={<AuthCheck />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/notifications' element={<NotificationsView />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App