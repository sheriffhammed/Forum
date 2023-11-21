import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/forumURL'
import { fetchPosts } from "./fetchPosts";

export const addPost = createAsyncThunk('posts/addPost', async(data, thunkApi) => {
    try {
        const response = await api.post('posts', data)
        if(response){
            //return response.data
            thunkApi.dispatch(fetchPosts())
        }
    } catch (error) {
        return error.message
    }
})
