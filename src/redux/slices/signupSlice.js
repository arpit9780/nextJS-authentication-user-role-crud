import { createSlice } from "@reduxjs/toolkit"

const userRegistered = 
typeof window !== "undefined" && localStorage.getItem("registered");

const initialState ={
    users:userRegistered,
    error:""
}

export const SignupSlice = createSlice({
    name:"SignupSlice",
    initialState,
    reducers:{
        registerUser(state,action){
            localStorage.setItem("registered",JSON.stringify(action.payload))
            state.users=JSON.stringify(action.payload)
        }
    }
})

export const { registerUser } = SignupSlice.actions
export default SignupSlice.reducer;