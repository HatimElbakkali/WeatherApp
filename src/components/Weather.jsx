import { WiHumidity, WiStrongWind, WiSunrise, WiSunset } from "react-icons/wi";
import { MdLocationOn, MdAccessTime } from "react-icons/md";
import { useSelector } from "react-redux";
import moment from "moment";
import { motion, AnimatePresence } from "framer-motion";

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 110,
            damping: 15,
            when: "beforeChildren",
            staggerChildren: 0.09,
        },
    },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150, damping: 16 } },
};

export default function Weather() {
    const weather = useSelector(({ weather }) => weather);
    return (
        <>
            <div className="flex justify-center p-4">
                <AnimatePresence mode="wait">
                    {weather.isLoaded ? (
                        <motion.div
                            key={weather.name}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            whileHover={{ y: -4 }}
                            className="w-80 rounded-3xl bg-gradient-to-b from-sky-100 via-white to-white shadow-xl shadow-sky-100 border border-white overflow-hidden text-center"
                        >
                            <div className="p-6">
                                {/* City */}
                                <motion.div variants={itemVariants} className="flex justify-center items-center gap-1">
                                    <h2 className="text-2xl font-bold text-slate-800">
                                        {weather.name}, {weather.sys.country}
                                    </h2>
                                    <MdLocationOn className="text-2xl text-rose-500" />
                                </motion.div>

                                {/* Date */}
                                <motion.div
                                    variants={itemVariants}
                                    className="mt-1 flex justify-center items-center gap-1 text-sm text-slate-500"
                                >
                                    <h3>{moment.unix(weather.dt).format("dddd, HH:mm")}</h3>
                                    <MdAccessTime />
                                </motion.div>

                                <div className="mt-4 flex flex-col items-center gap-2">
                                    {/* Icon (floating) */}
                                    <motion.img
                                        variants={itemVariants}
                                        animate={{ y: [0, -8, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                        className="w-28 h-28 drop-shadow-lg"
                                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                        alt={weather.weather[0].description}
                                    />

                                    <motion.span
                                        variants={itemVariants}
                                        className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-sm font-medium capitalize"
                                    >
                                        {weather.weather[0].description}
                                    </motion.span>

                                    {/* Temperature */}
                                    <motion.div
                                        variants={itemVariants}
                                        className="text-6xl font-extrabold text-slate-900 tracking-tight"
                                    >
                                        {Math.round(weather.main.feels_like)}°C
                                    </motion.div>

                                    {/* Humidity + wind */}
                                    <motion.div variants={itemVariants} className="mt-2 grid grid-cols-2 gap-3 w-full">
                                        <div className="flex items-center justify-center gap-1 rounded-2xl bg-white/80 border border-slate-100 py-2 text-slate-600 shadow-sm">
                                            <WiHumidity className="text-3xl text-sky-500" />
                                            <span className="font-medium">{weather.main.humidity}%</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-1 rounded-2xl bg-white/80 border border-slate-100 py-2 text-slate-600 shadow-sm">
                                            <WiStrongWind className="text-3xl text-teal-500" />
                                            <span className="font-medium">{(weather.wind.speed * 3.6).toFixed(1)} km/h</span>
                                        </div>
                                    </motion.div>

                                    {/* Sunrise + sunset */}
                                    <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 w-full">
                                        <div className="flex items-center justify-center gap-1 rounded-2xl bg-orange-50 py-2 text-slate-600">
                                            <WiSunrise className="text-4xl text-orange-400" />
                                            <span className="font-medium">{moment.unix(weather.sys.sunrise).format("HH:mm")}</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-1 rounded-2xl bg-orange-50 py-2 text-slate-600">
                                            <WiSunset className="text-4xl text-orange-600" />
                                            <span className="font-medium">{moment.unix(weather.sys.sunset).format("HH:mm")}</span>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-80 rounded-3xl bg-white/80 shadow-lg border border-slate-100 p-10 text-center text-slate-500 font-medium"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.15, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="flex justify-center mb-3"
                            >
                                <MdLocationOn className="text-5xl text-sky-400" />
                            </motion.div>
                            Please Choose Your City
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}