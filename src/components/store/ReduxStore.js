import { configureStore } from "@reduxjs/toolkit";
import infoSlice from "./CounterSlice";

const store = configureStore({
    reducer: {
        info : infoSlice,
    },
});

export default store;