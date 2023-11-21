import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/forumURL'
import { fetchLikes } from "./fetchLike";

export const addLike = createAsyncThunk("likes/addLike", async(data, {dispatch}) => {
    try {
        const response = await api.post('likes', data)
        if(response){
            //return response.data
            dispatch(fetchLikes())
        }
    } catch (error) {
        return error.message
    }
    
})