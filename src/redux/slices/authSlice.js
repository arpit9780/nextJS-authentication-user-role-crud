import { createSlice } from "@reduxjs/toolkit"

const authToken =
  typeof window !== "undefined" && localStorage.getItem("token");
    
const initialState = {
    authToken:authToken,
    error: ''
}

const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState,
    reducers: {
        authLogin(state, action) {
            const data = state.authToken
            localStorage.setItem("token", action.payload)
            state.authToken = action.payload
        },
        authLogout(state) {
            localStorage.removeItem("token")
            state.authToken = null
        }
    }
})
export const { authLogin,authLogout } = AuthSlice.actions
export default AuthSlice.reducer;