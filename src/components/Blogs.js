import React from 'react'


const Blog = ({blog}) => (
  <div>{blog.title} {blog.author}</div>
)

const Blogs = ({ blogs }) => (
  <div>
    {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
  </div>
)

export default Blogs
