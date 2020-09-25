import React, { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, setMessage, setErrorMessage }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetail, setShowDetail] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const buttonLabel = showDetail ? 'hide' : 'view'
  const detailStyle = { display: showDetail ? '' : 'none' }

  const toggleDetail = () => {
    setShowDetail(!showDetail)
  }


  const addLikes = async () => {
    try {
      const newObject = {
        ...blog,
        likes: likes + 1
      }
      console.log('@@', newObject)
      const updatedBlog = await blogService.updateBlog(blog.id, newObject)
      console.log('##', updatedBlog)
      setLikes(updatedBlog.likes)
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
  
  return (
    <div style={blogStyle}>
      {blog.title} 
      <button onClick={toggleDetail}>{buttonLabel}</button>
      <div style={detailStyle}>
        <div>{blog.url}</div>
        <div>
          likes {likes}
          <button onClick={addLikes}>like</button>
          </div>
        <div>{blog.author}</div>
        
      </div>
    </div>
  )
}

const DisplayBlogs = ({ blogs, setMessage, setErrorMessage }) => (
  <div>
    {blogs.map(blog => <Blog 
      key={blog.id}
      blog={blog}
      setMessage={setMessage}
      setErrorMessage={setErrorMessage}
    />)}
  </div>
)

export default DisplayBlogs
