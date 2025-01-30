import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProjectsData } from "../api";

// Async thunk to fetch projects
export const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
  const response = await fetchProjectsData();
  return response;
});

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default projectsSlice.reducer;
