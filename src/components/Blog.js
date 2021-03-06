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
      delete newObject.user
      const updatedBlog = await blogService.updateBlog(blog.id, newObject)
      const newBlogs = blogs.map(blog =>
        blog.id === updatedBlog.id
          ? { ...blog, likes: updatedBlog.likes }
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
      <div id="basics">{blog.title}, from: {blog.author}</div>
      <button onClick={toggleDetail} id="button">{buttonLabel}</button>
      <div style={detailStyle} className="details" id="details">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={addLikes} id="like-button">like</button>
        </div>
      </div>
      { user.username === blog.user.username &&
      <div>
        <button onClick={removeBlogHandler} id="delete-button">remove</button>
      </div>}
    </div>
  )
}


export default Blog