import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'filter',
  initialState: { value: '' },
  reducers: {
    changeFilter: (state, action) => (state.value = action.payload),
  },
});

export const { changeFilter } = slice.actions;
export default slice.reducer;
