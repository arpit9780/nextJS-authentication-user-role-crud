import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit"

// initial states here
const initalState = {};

// creating store
export const store = configureStore({
    reducer: rootReducer
    ,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore, {debug: false});

