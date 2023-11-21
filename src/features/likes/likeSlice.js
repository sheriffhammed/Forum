import { createSlice } from "@reduxjs/toolkit";
import { fetchLikes } from "./middleware/fetchLike";

const initialState = {
    likes : [],
    error : null
}

const likeSlice = createSlice({
    name: "likes",
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(fetchLikes.fulfilled, (state, action) => {
            state.likes = action.payload
            
        })
    }
})

export const allLikes = state => state.likes.likes

export const likesByPostID = (state, postID) => 
    state.likes.likes.filter(like => like.postId === postID)
export default likeSlice.reducer