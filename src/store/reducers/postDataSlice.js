import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  error: null,
  loading: false, // Initialize loading as false
};

export const getData = createAsyncThunk("get", async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts"); // Use await here
    const data = await res.json(); // Use await here
    return data;
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error to trigger the rejected action
  }
});

const postDataSlice = createSlice({
  name: "postData",
  initialState,
  reducers: {}, // You can add reducers here if needed

  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null; // Clear any previous errors on success
      })
      .addCase(getData.rejected, (state) => {
        state.loading = false;
        state.error = "Something Wrong!";
      });
  },
});

export default postDataSlice.reducer;
