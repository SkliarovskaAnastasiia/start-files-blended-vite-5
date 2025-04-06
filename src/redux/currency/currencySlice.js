import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCurrency,
  getExchangedCurrency,
  getLatestRates,
} from './operations';

const slice = createSlice({
  name: 'currency',
  initialState: {
    baseCurrency: '',
    exchangeInfo: null,
    isLoading: false,
    isError: null,
    rates: [],
  },
  reducers: {
    setBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCurrency.fulfilled, (state, action) => {
        state.baseCurrency = action.payload;
      })
      .addCase(getExchangedCurrency.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getExchangedCurrency.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.exchangeInfo = action.payload;
      })
      .addCase(getExchangedCurrency.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.exchangeInfo = null;
      })
      .addCase(getLatestRates.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getLatestRates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.rates = action.payload;
      })
      .addCase(getLatestRates.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.rates = [];
      });
  },
});

export const { setBaseCurrency } = slice.actions;

export default slice.reducer;
