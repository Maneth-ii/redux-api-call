import { configureStore } from "@reduxjs/toolkit";
import postDataSlice from "./reducers/postDataSlice";

const store = configureStore({
    reducer:{
        postData:postDataSlice,
    }
})

export default store;