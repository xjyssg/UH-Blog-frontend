import React, { useState } from 'react'
import blogService from '../services/blogs'


const CreateBlogForm = ({ setBlogs, blogs, setMessage, setErrorMessage, createBlogFormRef }) => {
  const [title, SetTitle] = useState('')
  const [author, SetAuthor] = useState('')
  const [url, SetUrl] = useState('')

  const titleChangeHandler = (event) =>
    SetTitle(event.target.value)
  const authorChangeHandler = (event) =>
    SetAuthor(event.target.value)
  const urlChangeHandler = (event) =>
    SetUrl(event.target.value)

  const addBlogHandler = async (event) => {
    event.preventDefault()

    try {
      const newObject = {
        title: title,
        author: author,
        url: url,
        likes: 0,
      }
      const savedBlog = await blogService.createBlog(newObject)
      setBlogs(blogs.concat(savedBlog))
      console.log('adding', savedBlog)
      createBlogFormRef.current.toggleVisibility()
      setMessage('creation succeed')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('creation fail')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlogHandler}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="title"
            id="title"
            onChange={titleChangeHandler}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="author"
            id="author"
            onChange={authorChangeHandler}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="url"
            id="url"
            onChange={urlChangeHandler}
          />
        </div>
        <button type="submit" id="create">create</button>
      </form>
    </div>
  )
}


export default CreateBlogForm