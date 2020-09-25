import React from 'react'


const Blog = ({blog}) => (
  <div>{blog.title} {blog.author}</div>
)

const Logout = ({logoutHandler}) => (
  <button onClick={logoutHandler}>logout</button>
)

const Blogs = ({ blogs, user, logoutHandler }) => (
  <div>
    <h2>blogs</h2>
    <p> 
      {user.name} logged in 
      <Logout logoutHandler={logoutHandler} />
      </p>
    {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
  </div>
)

export default Blogs
