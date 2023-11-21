import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/forumURL'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async() => {
    try {
        const response = await api.get('posts')
        return response.data
    } catch (error) {
        return error.message
    }
    
  })