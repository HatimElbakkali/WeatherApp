import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { setData, resetData } from '../features/weather/weatherSlice';

// ---------- Animation variants ----------
const formVariants = {
    hidden: { opacity: 0, y: -24, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 120,
            damping: 16,
            when: 'beforeChildren',
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 160, damping: 18 } },
};

// ---------- MUI styling with Tailwind (arbitrary variants) ----------
const textFieldClass = [
    '[&_.MuiOutlinedInput-root]:!rounded-2xl',
    '[&_.MuiOutlinedInput-root]:!bg-slate-50',
    '[&_.MuiOutlinedInput-root]:transition-all',
    '[&_.MuiOutlinedInput-root]:duration-200',
    '[&_.MuiOutlinedInput-root.Mui-focused]:!bg-white',
    '[&_.MuiOutlinedInput-root.Mui-focused]:shadow-[0_0_0_4px_rgba(59,130,246,0.15)]',
    '[&_fieldset]:!border-slate-200',
    '[&_.MuiOutlinedInput-root:hover_fieldset]:!border-blue-300',
    '[&_.Mui-focused_fieldset]:!border-blue-500',
    '[&_.MuiInputLabel-root.Mui-focused]:!text-blue-500',
].join(' ');

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        <circle cx="12" cy="12" r="8" />
    </svg>
);

export default function SearchBar() {
    const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY;
    const WEATHER_API_KEY = import.meta.env.VITE_APP_WEATHER_API
    const [cities, setCities] = useState([]);
    const [unity, setUnity] = useState('metric');
    const [geoLocation, setGeoLocation] = useState(undefined)
    const [isCurrentLocation, setIsCurrentLocation] = useState(false)
    const getGeoLocation = () => {
        return navigator.geolocation.getCurrentPosition((position) => {
            setIsCurrentLocation(true)
            setGeoLocation({
                lon: position.coords.longitude,
                lat: position.coords.latitude
            })
        }

        )
    }
    const hasGeoLocation = () => {
        return navigator.geolocation
    }



    useEffect(() => {
        getData()
    }, [geoLocation]);

    useEffect(() => {
        if (hasGeoLocation()) {
            getGeoLocation()
        }
    }, [])


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

    const getData = () => {
        if (geoLocation) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&units=${unity}&lon=${geoLocation.lon}&appid=${WEATHER_API_KEY}`)
                .then(response => response.json())
                .then(json => {
                    const { clouds, main, name, sys, weather, wind, country, dt } = json
                    dispatch(setData({ clouds, main, name, sys, weather, wind, country, dt }))
                })
        }
    }

    const handleAutoCompleteSelect = (e, value) => {
        if (value !== null) {
            const { lon, lat } = value
            setIsCurrentLocation(false)
            setGeoLocation({
                lon,
                lat,
            })

        } else {
            dispatch(resetData())
        }

    }
    return (
        <>
            <motion.form
                variants={formVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -2 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-2xl mx-auto p-4 bg-white/90 backdrop-blur rounded-3xl shadow-xl shadow-sky-100 border border-slate-100 mt-3"
            >
                <motion.div variants={itemVariants} className="flex-1 min-w-0">
                    <Autocomplete
                        fullWidth
                        getOptionLabel={(option) => option.formatted || ""}
                        clearOnBlur={false}
                        onChange={handleAutoCompleteSelect}
                        renderInput={(params) => (
                            <TextField
                                onChange={handleInputChange}
                                {...params}
                                label={'Enter City...'}
                                className={textFieldClass}
                            />
                        )}
                        options={cities}
                    />
                </motion.div>

                <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.94 }}
                    type="button"
                    className="flex items-center justify-center gap-2 px-6 h-14 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold rounded-2xl shadow-lg shadow-blue-200 cursor-pointer"
                >
                    <SearchIcon />
                    Search
                </motion.button>

                <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.94 }}
                    type="button"
                    onClick={() => getGeoLocation()}
                    className="flex items-center justify-center gap-2 px-5 h-14 bg-white hover:bg-blue-50 text-blue-600 font-semibold rounded-2xl border-2 border-blue-100 transition-colors duration-200 cursor-pointer"
                >
                    <motion.span
                        animate={isCurrentLocation ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                        transition={{ duration: 1.2, repeat: isCurrentLocation ? Infinity : 0 }}
                        className="flex"
                    >
                        <LocationIcon />
                    </motion.span>
                    Use Your Location
                </motion.button>
            </motion.form>
        </>
    )
}