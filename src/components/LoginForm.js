import React from 'react'

const LoginForm = ({loginHandler, username, usernameChangeHandler, password, passwordChangeHandler}) => (
  <form onSubmit={loginHandler}>
    <h2>log in to application</h2>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={usernameChangeHandler}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={passwordChangeHandler}
      />
    </div>
    <button type="submit">login</button>
  </form>      
)

export default LoginForm
