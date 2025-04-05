import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../../service/opencagedataApi';

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
      thunkAPI.rejectWithValue(error);
    }
  },
);
