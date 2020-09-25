import React from 'react'


const BlogForm = ({addBlog, newBlog, blogChangeHandler}) => (
    <form onSubmit={addBlog}>
      <input
        value={newBlog}
        onChange={blogChangeHandler}
      />
      <button type="submit">save</button>
    </form>  
  )


  export default BlogForm