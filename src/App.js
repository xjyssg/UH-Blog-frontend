import React, { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import LoggedInfo from './components/LoggedInfo'
import Blogs from './components/Blogs'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Toggle from './components/Toggle'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

  const loginHandler = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      ) 
      setUser(user)
      setMessage('login succeed')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    setUsername('')
    setPassword('')
  }

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
          loginHandler={loginHandler} 
          username={username} 
          usernameChangeHandler={({target}) => setUsername(target.value)} 
          password={password} 
          passwordChangeHandler={({target}) => setPassword(target.value)} 
        />
      }
      
      {user !== null && <LoggedInfo user={user} logoutHandler={logoutHandler} />}

      <Toggle buttonLabel='create' ref={createBlogFormRef}>
        <CreateBlogForm 
          setBlogs={setBlogs} 
          blogs={blogs} 
          setMessage={setMessage} 
          setErrorMessage={setErrorMessage}
          createBlogFormRef={createBlogFormRef}
        />
      </Toggle>
      
      {user !== null && <Blogs blogs={blogs} user={user} logoutHandler={logoutHandler} />}
    </div>
  )
}


export default App