import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/forumURL'

export const fetchLikes = createAsyncThunk('likes/fetchLikes', async() => {
    try {
        const response = await api.get('likes')
        //if(response){
            //console.log('All lIkes :', response.data)
            return response.data
            
        //}
    } catch (error) {
        return error.message
    }
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async() => {
    try {
        const response = await api.get('posts')
        return response.data
    } catch (error) {
        return error.message
    }
    
  })