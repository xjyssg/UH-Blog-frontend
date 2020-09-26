import React from 'react'
import Blog from './Blog'


const DisplayBlogs = ({ user, blogs, setBlogs, setMessage, setErrorMessage }) => {
  const orderedBlogs = blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
  setBlogs(orderedBlogs)
  console.log(user, blogs)
  return (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          setMessage={setMessage}
          setErrorMessage={setErrorMessage}
        />)}
    </div>
  )
}

export default DisplayBlogs
