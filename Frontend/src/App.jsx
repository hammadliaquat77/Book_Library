import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import EditBook from './pages/EditBook'
import BookDetail from './pages/BookDetail'
import AddBook from './pages/AddBook'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
    <div className='min-h-screen bg-gray-100'>
      <Navbar/>      
        <div className="max-w-6xl mx-auto p-4">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/edit/:id' element={<EditBook/>}/>
        <Route path='/detail/:id' element={<BookDetail/>}/>
        <Route path='/addbook' element={<AddBook/>}/>
      </Routes>
      </div>        
    

    </div>
    
    </>
  )
}

export default App