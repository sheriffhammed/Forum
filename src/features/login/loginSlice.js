import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
    isLogin: false,
    firstName: "",
    surName : "",
    userId: ""
}

const loginSlice = createSlice({
    name: 'login',
    initialState:{ value: initialStateValue },
    reducers: {
      login : (state, action) => {
        state.value = action.payload;
      },
      logout: state => {
        state.value = initialStateValue
      }
      
    }
  })
  
  export const loginDetails = state => state.login.value
  export const { login, logout } = loginSlice.actions
  export default loginSlice.reducer
  
  
  