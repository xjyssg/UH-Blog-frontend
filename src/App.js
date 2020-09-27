import React, { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import LoggedInfo from './components/LoggedInfo'
import DisplayBlogs from './components/DisplayBlogs'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Toggle from './components/Toggle'
import blogService from './services/blogs'
import './App.css'


const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const createBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAllBlogs().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const logoutHandler = () => {
    window.localStorage.removeItem('loggedBlogUser')
    blogService.setToken(null)
    setUser(null)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} color='green' />
      <Notification message={errorMessage} color='red' />

      {user === null &&
        <LoginForm
          setUser={setUser}
          setMessage={setMessage}
          setErrorMessage={setErrorMessage}
        />
      }

      {user !== null && <LoggedInfo user={user} logoutHandler={logoutHandler} />}

      <Toggle buttonLabel='new blog' ref={createBlogFormRef}>
        <CreateBlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          setMessage={setMessage}
          setErrorMessage={setErrorMessage}
          createBlogFormRef={createBlogFormRef}
        />
      </Toggle>

      {user !== null &&
        <DisplayBlogs
          user={user}
          blogs={blogs}
          setBlogs={setBlogs}
          setMessage={setMessage}
          setErrorMessage={setErrorMessage}
        />
      }
    </div>
  )
}


export default App