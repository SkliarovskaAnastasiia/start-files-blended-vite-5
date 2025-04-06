import { createSelector } from '@reduxjs/toolkit';
import { selectFilter } from '../filter/selector';

export const selectBaseCurrency = state => state.currency.baseCurrency;
export const selectExchangeInfo = state => state.currency.exchangeInfo;
export const selectIsLoading = state => state.currency.isLoading;
export const selectIsError = state => state.currency.isError;

export const selectAllRates = state => state.currency.rates;

export const selectLatestRates = createSelector(
  [selectAllRates, selectBaseCurrency, selectFilter],
  (rates, baseCurrency, filter) => {
    return rates
      .filter(
        ([key]) =>
          key !== baseCurrency &&
          key.toLoweCase().includes(filter.toLoweCase()),
      )
      .map(([key, value]) => {
        return { key, value: (1 / value).toFixed(2) };
      });
  },
);
