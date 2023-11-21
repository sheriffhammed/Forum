import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/forumURL'
import { fetchLikes } from "./fetchLike";

export const disLike = createAsyncThunk('likes/disLike', async(id, {dispatch}) => {
    try {
        const response = await api.delete(`likes/${id}`)
        if(response){
            dispatch(fetchLikes())
        }
    } catch (error) {
        return error.message
    }
})