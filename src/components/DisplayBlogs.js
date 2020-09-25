import React, { useState } from 'react'


const Blog = ({blog}) => {
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
  
  return (
    <div style={blogStyle}>
      {blog.title} 
      <button onClick={toggleDetail}>{buttonLabel}</button>
      <div style={detailStyle}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button>like</button>
          </div>
        <div>{blog.author}</div>
        
      </div>
    </div>
  )
}

const DisplayBlogs = ({ blogs }) => (
  <div>
    {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
  </div>
)

export default DisplayBlogs
