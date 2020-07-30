import React from 'react'
import Header from './Header'
import '../index.css'
import Post from './Post'

function App() {
    return (
        <div className='app'>
            <div className = 'app__header'>
                <Header/>
            </div>
            <div className='app__body'>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            </div>
        </div>

    )
}

export default App
