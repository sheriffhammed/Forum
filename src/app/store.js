import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import loginReducer from "../features/login/loginSlice"
import postReducer from "../features/posts/postSlice"
import likeReducer from "../features/likes/likeSlice"

export const store = configureStore({
    reducer : {
        users : userReducer,
        login : loginReducer,
        posts: postReducer,
        likes: likeReducer
    }
})