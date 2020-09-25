import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null


const setToken = newToken => {
  token = `bear ${newToken}`
}

const getAllBlogs = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const createBlog = async newObject => {
  const config = {
    header: {Authorization: token},
  }
  
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const deleteBlog = id => {
  return axios.delete(`${baseUrl}/${id}`).then(response => console.log("delete!!", response))
}

const updateBlog = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}


export default {getAllBlogs, createBlog, deleteBlog, updateBlog, setToken}