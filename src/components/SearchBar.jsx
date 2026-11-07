import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setData } from '../features/weather/weatherSlice';
export default function SearchBar() {
    const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY;
    const WEATHER_API_KEY = import.meta.env.VITE_APP_WEATHER_API
    const [cities, setCities] = useState([]);
    const [unity, setUnity] = useState('metric');
    const dispatch = useDispatch()

    const handleInputChange = async (e) => {
        const { value } = e.currentTarget;
        try {
            const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&type=city&format=json&apiKey=${GEO_API_KEY}`);
            if (!response.ok) {
                throw new Error("Failed to fetch cities")
            }
            const json = await response.json()
            setCities(json.results.map(({ lat, lon, city, country, formatted }) => ({ lat, lon, city, country, formatted })));

        } catch (error) {
            console.error(error.message);

        } finally {
            console.log("Request completed");
        }
    }

    const handleAutoCompleteSelect = async (e, value) => {
        const { lon, lat } = value;
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unity}&appid=${WEATHER_API_KEY}`)
            if (!response.ok) {
                throw new Error("Failed to fetch lat, lot")
            }
            const json = await response.json();
            const {clouds,main,name,sys,weather,wind} = json
            dispatch(setData({clouds,main,name,sys,weather,wind}))

        } catch (error) {
            console.error(error.message);
        }finally{
            console.log("Request completed lan, lot");
        }
    }
    return (
        <>
            <form className="flex items-center gap-3 w-full max-w-md mx-auto p-2 bg-white rounded-xl shadow-md border border-gray-200 mt-5">
                <Autocomplete className='flex-1 min-w-0 px-4 py-3 text-gray-700 bg-transparent outline-none placeholder-gray-400' getOptionLabel={(option) => option.formatted || ""} clearOnBlur={false}
                    onChange={handleAutoCompleteSelect}
                    renderInput={(params) => <TextField onChange={handleInputChange} {...params} label={'Enter City...'} />} options={cities} />
                <button
                    type="button"
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200"
                >
                    Search
                </button>
            </form>
        </>
    )
}
