import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: !!JSON.parse(localStorage.getItem('darkMode')),
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    }
  }  
})

export const asyncToggleTheme = () => (dispatch) => {
  const isDarkMode = !!JSON.parse(localStorage.getItem('darkMode'));
  localStorage.setItem('darkMode', !isDarkMode);
  dispatch(toggleTheme());
};

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;