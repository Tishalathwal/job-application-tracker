import { configureStore } from '@reduxjs/toolkit';
import applicationsReducer from '../features/applications/applicationsSlice';

export const store = configureStore({
  reducer: {
    applications: applicationsReducer,
  },
});