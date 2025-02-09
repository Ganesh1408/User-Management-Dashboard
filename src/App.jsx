
import './App.css'
import UserList from './Components/UserList'
import UserForm from './Components/UserForm'
import {BrowserRouter, Route,Routes } from 'react-router-dom'
import UserProvider from './Components/UserProvider'

function App() {
  

  return (
    <UserProvider>
    <BrowserRouter>
    <Routes>
    <Route exact path="/" element={<UserList/>}/>
    <Route exact path="/userForm" element={<UserForm/>}/>
    
    </Routes>
    
    </BrowserRouter>
    </UserProvider>
  )
}

export default App
