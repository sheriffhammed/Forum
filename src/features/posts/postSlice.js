import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./middleware/fetchPosts";
import { deletePost } from "./middleware/deletePost";
import { editPost } from "./middleware/editPost"
import { addPost } from "./middleware/addPost";

const initialState = {
    posts:[],
    error: null,
    isLoading:false,
    status : 'idle'
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers:{},
    
    extraReducers: builder => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.isLoading = true
            state.status = 'loading'
            //alert('Loading Data')
        })
        builder.addCase(fetchPosts.fulfilled, (state, action) =>{
            //alert('Loaded Data Succesful')
            state.status = 'succeeded'
            state.posts = action.payload
            state.isLoading = false
            //console.log("Action Payload :", action.payload)
        })
        builder.addCase(fetchPosts.rejected, (state, action)=> {
            //alert('Loading Data Failed')
            state.status = 'failed'
            state.error = action.error.message
            state.isLoading = false
        })
        builder.addCase(deletePost.fulfilled, (state, action) => {
            // console.log('action payload for delete', action.payload)
            // const { id } = action.payload
            // const posts = state.posts.filter(post => post.id !== id);
            // state.posts = posts;
            if (!action.payload?.id) {
                console.log('Delete could not complete')
                console.log(action.payload)
                return;
            }
            const { id } = action.payload;
            const posts = state.posts.filter(post => post.id !== id);
            state.posts = posts;
        })
        builder.addCase(editPost.fulfilled, (state, action) => {
             
            if (!action.payload?.id) {
              console.log('Update could not complete')
              console.log(action.payload)
              return;
            }
            const { id } = action.payload
            const post = state.posts.filter(post => post.id === id);
            // console.log('post Details :', post)
            // console.log('action Payload :', action.payload)
            state.users = [...post, action.payload];
        })
        // builder.addCase(addPost.fulfilled, (state, action) => {
        //     //state.posts.push(action.payload)
        // })
    }
})

export const selectAllPosts  = state => state.posts.posts

export const postByUserId = (state, userId) =>
    state.posts.posts.filter(post => post.userId === userId)

export const selectPostById = (state, postId) =>
    state.posts.posts.find(post => post.id === postId);

export const postError = state => state.posts.error

export const postIslosding = state => state.posts.isLoading

export const postStatus = state => state.posts.status

export default postSlice.reducer

