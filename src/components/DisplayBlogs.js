import React, { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ user, blog, blogs, setBlogs, setMessage, setErrorMessage }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetail, setShowDetail] = useState(false)

  const buttonLabel = showDetail ? 'hide' : 'view'
  const detailStyle = { display: showDetail ? '' : 'none' }

  const toggleDetail = () => {
    setShowDetail(!showDetail)
  }


  const addLikes = async () => {
    try {
      const newObject = {
        ...blog,
        likes: blog.likes + 1
      }
      const updatedBlog = await blogService.updateBlog(blog.id, newObject)
      const newBlogs = blogs.map(blog => 
        blog.id === updatedBlog.id 
        ? {...blog, likes: updatedBlog.likes}
        : blog)
      setBlogs(newBlogs)
      setMessage('like success')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('like fail')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const removeBlogHandler = async () => {
    if (window.confirm(`Remove ${blog.title}`)) {
      try {
        await blogService.deleteBlog(blog.id)
        const newBlogs = blogs.filter(aBlog => aBlog.id !== blog.id)
        setBlogs(newBlogs)
        setMessage('deletion success')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } catch (exception) {
        setErrorMessage('deletion fail')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }
  
  return (
    <div style={blogStyle}>
      {blog.title} 
      <button onClick={toggleDetail}>{buttonLabel}</button>
      <div style={detailStyle}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={addLikes}>like</button>
          </div>
        <div>{blog.author}</div>
      </div>
      { user.username === blog.user.username &&
      <div>
        <button onClick={removeBlogHandler}>remove</button>
      </div>}
    </div>
  )
}

const DisplayBlogs = ({ user, blogs, setBlogs, setMessage, setErrorMessage }) => {
  const orderedBlogs = blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
  setBlogs(orderedBlogs)
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
