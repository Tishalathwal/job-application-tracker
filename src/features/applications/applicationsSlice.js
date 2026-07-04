import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setApplications: (state, action) => {
      state.items = action.payload;
    },
    addApplication: (state, action) => {
      state.items.push(action.payload);
    },
    updateApplication: (state, action) => {
      const index = state.items.findIndex(app => app.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteApplication: (state, action) => {
      state.items = state.items.filter(app => app.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setApplications,
  addApplication,
  updateApplication,
  deleteApplication,
  setLoading,
  setError,
} = applicationsSlice.actions;

export default applicationsSlice.reducer;