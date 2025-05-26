import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const carsInitialValue = [
  {
    make: "Toyota",
    quantity: 10,
    id: 1,
  },
  {
    make: "Honda",
    quantity: 10,
    id: 2,
  },
  {
    make: "Nissan",
    quantity: 7,
    id: 3,
  },
];

export const fetchInitialData = createAsyncThunk(
  "cars/fetchInitialData",
  async () => {
    const response = new Promise((resolve) => {
      setTimeout(() => {
        resolve(carsInitialValue);
      }, 1500);
    });
    return response;
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    loading: false,
    cars: [],
  },
  reducers: {
    sell: (state, action) => {
      // Immer handles changes immutably, so that we can write "mutating" logic in the reducers
      const car = state.find((car) => car.id === action.payload);
      if (car) {
        car.quantity -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchInitialData.fulfilled, (state, action) => {
        console.log(action.payload);
        state.cars = action.payload;
        state.loading = false;
      });
  },
});

export const { sell } = carsSlice.actions; // cars/sell

export default carsSlice.reducer;
