import { createAsyncThunk } from "@reduxjs/toolkit"
import api from '../../api/forumURL'
import { fetchPosts } from "./fetchPosts"

export const editPost = createAsyncThunk('posts/editPost', async(data, {dispatch}) => {
    const { id } = data
    try {
      const response = await api.put(`posts/${id}`, data)
      
      if(response){
        //console.log('Response Data', response.data)
        //return response.data
        dispatch(fetchPosts())
      }
    } catch (error) {
      return error.message
    }
  })