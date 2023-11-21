import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../api/forumURL' 

const initialState = {
    users: [],
    userId : "",
    firstName : "",
    surName : "",
    isLogin : false,
    error : null
  }

//Fetch Users
export const fetchUser = createAsyncThunk('user/fetchUser', async() => {
    try {
        const response = await api.get('employee')
        return response.data
    } catch (error) {
        return error.message
    }
    
  })

//Add New User
export const addNewUser = createAsyncThunk("user/addNewUser", async (data)=> {
  try {
      const response = await api.post("employee", data)
      if(response){
          return response.data
      }

  } catch (error) {
      return error.message
  } 
  
})

//Update User
export const updateUser = createAsyncThunk('user/updateUser', async(data) => {
  const { id } = data
  try {
    const response = await api.put(`employee/${id}`, data)
    
    if(response){
      //console.log('Response Data', response.data)
      return response.data
    }
  } catch (error) {
    return error.message
  }
})


  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            const {id, firstName, surName} = action.payload
            state.users = action.payload
            state.userId = id
            state.firstName = firstName
            state.surName = surName
            state.isLogin = true
            state.error = ''
      })
      builder.addCase(addNewUser.fulfilled , (state, action) => {
        state.users.push(action.payload)
        //console.log("Action Payload",action.payload)
      })
      builder.addCase(updateUser.fulfilled, (state, action) => {
        // const {id, firstName, surName, email, phone } = action.payload
        // const userDetails = state.users.filter(user => user.id === id)
        // if (userDetails){
        //   userDetails.id = id;
        //   userDetails.firstName = firstName;
        //   userDetails.surName = surName;
        //   userDetails.email = email;
        //   userDetails.phone = phone;
        // }
        // const { id } = action.payload;
        // const userDetails = state.users.filter(user => user.id === id);
        // state.users = [...userDetails, action.payload];
        // //state.users = action.payload

        if (!action.payload?.id) {
          console.log('Update could not complete')
          console.log(action.payload)
          return;
        }
        const { id } = action.payload
        const userDetails = state.users.filter(user => user.id === id);
        console.log('userDetails :', userDetails)
        console.log('action Payload :', action.payload)
        state.users = [...userDetails, action.payload];



      })

      
       
    }
  })


  export const selectUsers = state => state.users
  // export const loginStatus = state => state.isLogin
  // export const loginUserFirstName = state => state.firstName
  // export const loginUserId = state => state.userId
  export const selectUsersByEmail = (state, email) =>
    state.users.filter(user => user.email === email)

  export const selectUserById = (state, userId) =>
    state.users.filter(user => user.id === userId)

  export default userSlice.reducer  
  