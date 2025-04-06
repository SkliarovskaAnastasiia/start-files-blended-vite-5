import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../../service/opencagedataApi';
import { exchangeCurrency, latestRates } from '../../service/exchangeAPI';

export const fetchCurrency = createAsyncThunk(
  'currency/fetchCurrency',
  async (location, thunkAPI) => {
    const state = thunkAPI.getState();
    const { baseCurrency } = state.currency;

    if (baseCurrency) {
      return thunkAPI.rejectWithValue('We already have base currency!');
    }

    try {
      const data = await getUserInfo(location);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getExchangedCurrency = createAsyncThunk(
  'currency/getExchangedCurrency',
  async (exchangeInfo, thunkAPI) => {
    try {
      const data = await exchangeCurrency(exchangeInfo);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getLatestRates = createAsyncThunk(
  'currency/getLatestRates',
  async (baseCurrency, thunkAPI) => {
    try {
      const data = await latestRates(baseCurrency);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
