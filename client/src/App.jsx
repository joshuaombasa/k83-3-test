import { useState } from 'react'

import './App.css'
import CreatePost from './components/CreatePost'
import Header from './components/Header'
import PostsList from './components/PostsList'



function App() {
 
  return (
    <div className='container'>
      <Header/>
     <CreatePost/>
     <PostsList/>
    </div>
  )
}

export default App
