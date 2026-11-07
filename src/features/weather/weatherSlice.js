import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    clouds: undefined,
    main: {
        feels_like: undefined,
    },
    name: undefined,
    sys:{
        country: undefined,
    } ,
    weather: undefined,
    wind: undefined
};

const WeatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers:{
        setData: (state, action) => {
            // state = action.payload;
            return action.payload;
        }
    }
})

export const {setData} = WeatherSlice.actions;
export default WeatherSlice.reducer;