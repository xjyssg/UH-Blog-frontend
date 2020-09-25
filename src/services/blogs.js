import axios from 'axios'
const baseUrl = '/api/blogs'


const getAllBlogs = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const createBlog = newObject => {
  return axios.post(baseUrl, newObject).then(response => response.data)
}

const deleteBlog = id => {
  return axios.delete(`${baseUrl}/${id}`).then(response => console.log("delete!!", response))
}

const updateBlog = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

export default {getAllBlogs, createBlog, deleteBlog, updateBlog}