import React from 'react'


const Blog = ({blog}) => (
  <div>{blog.title} {blog.author}</div>
)

const Blogs = ({ blogs, user }) => (
  <div>
    <h2>blogs</h2>
    <p> {user.name} logged in </p>
    {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
  </div>
)

export default Blogs
