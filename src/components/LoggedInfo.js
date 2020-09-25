import React from 'react'

const Logout = ({logoutHandler}) => (
  <button onClick={logoutHandler}>logout</button>
)

const LoggedInfo = ({user, logoutHandler}) => (
  <p> 
  {user.name} logged in 
  <Logout logoutHandler={logoutHandler} />
  </p>
)


export default LoggedInfo