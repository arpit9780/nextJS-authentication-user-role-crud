import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    usersList: [],
    error: "",
    status: ""
}

const UserSlice = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {
        userList(state, action) {
            const data = state.usersList
            state.usersList = [...data, action.payload]
            
        },
        deleteUser(state, action) {
            state.usersList.splice(action.payload,1)
            state.status = "Deleted User"
        },
        editUser(state, action) {
            state.usersList.splice(action.payload[0],1,action.payload[1])
            state.status = "Updated User"
        }
    }
})
export const {userList, deleteUser, editUser} = UserSlice.actions
export default UserSlice.reducer;