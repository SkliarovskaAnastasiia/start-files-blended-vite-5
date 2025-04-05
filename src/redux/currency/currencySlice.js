import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrency } from './operations';

const slice = createSlice({
  name: 'currency',
  initialState: {
    baseCurrency: '',
  },
  reducers: {
    setBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCurrency.fulfilled, (state, action) => {
      state.baseCurrency = action.payload;
    });
  },
});

export const { setBaseCurrency } = slice.actions;

export default slice.reducer;
