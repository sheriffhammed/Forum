import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../api/forumURL'


export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    const { id } = initialPost;
    try {
        // const response = await axios.delete(`${POSTS_URL}/${id}`)
        const response = await api.delete(`posts/${id}`);
        if (response?.status === 200) return initialPost;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})
