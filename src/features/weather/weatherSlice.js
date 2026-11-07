import { createSlice } from "@reduxjs/toolkit";

// const initialState = {

// };

const WeatherSlice = createSlice({
  name: "weather",
  initialState: {
    clouds: undefined,
    main: {
      feels_like: undefined,
    },
    name: undefined,
    sys: {
      country: undefined,
    },
    weather: undefined,
    dt: undefined,
    wind: {
      speed: undefined,
    },
    isLoaded: false,
  },
  reducers: {
    setData: (state, action) => {
      return {
        ...action.payload,
        isLoaded: true,
      };
    },

    resetData: (state) => {
      state.isLoaded = false;
    },
  },
});

export const { setData, resetData } = WeatherSlice.actions;
export default WeatherSlice.reducer;
