import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    roleList: [],
    error: "",
    status: ""
}

const RoleSlice = createSlice({
    name: "RoleSlice",
    initialState,
    reducers: {
        roleList(state, action) {
            const data = state.roleList 
            state.roleList = [...data,action.payload]
        },
        deleteRole(state, action) {
            state.roleList.splice(action.payload,1)
            state.status = "Deleted Role"
        },
        editRole(state, action) {
            state.roleList.splice(action.payload[0], 1, action.payload[1])
            state.status = "Updated Role"
        }
    }
})
export const {roleList, deleteRole, editRole} = RoleSlice.actions
export default RoleSlice.reducer;