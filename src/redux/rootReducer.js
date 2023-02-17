import { combineReducers } from "redux";
import RoleReducer from './slices/roleSlice'
import UserReducer from './slices/userSlice'
import AuthLogin from "./slices/authSlice";
import SignupSlice from "./slices/signupSlice";

const rootReducer = combineReducers({
      RoleReducer,
      UserReducer,
      AuthLogin,
      SignupSlice,
})

export default rootReducer;