import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "../slice/RTKCarsSlice";

// configure store will connect thunks automatically
const store = configureStore({
  reducer: {
    cars: carsReducer,
  },
});

export default store;
