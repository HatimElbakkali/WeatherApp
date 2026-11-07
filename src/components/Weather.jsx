import { WiDaySunny, WiHumidity, WiStrongWind, WiSunrise, WiSunset } from "react-icons/wi";
import { MdLocationOn, MdAccessTime } from "react-icons/md";
import { useSelector } from "react-redux";

export default function Weather() {
    const weather = useSelector(({ weather }) => weather);
    return (
        <>
        <pre>
            {/* {JSON.stringify(weather)} */}
        </pre>
            <div className="flex justify-center p-4">
                <div className="w-80 rounded-2xl bg-white shadow-lg overflow-hidden text-center">
                    <div className="p-6">
                        <div className="flex justify-center items-center">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {weather.name}, {weather.sys.country}
                            </h2>
                            <MdLocationOn className="text-3xl" />
                        </div>

                        <div className="mt-4 flex flex-col items-center gap-2">
                            <WiDaySunny className="text-8xl text-yellow-400" />
                            <div className="text-4xl font-bold text-gray-900">{weather.main.feels_like} C</div>

                            <div className="flex gap-4 text-gray-600">
                                <span className="flex items-center">
                                    <WiHumidity className="text-3xl" /> 40%
                                </span>
                                <span className="flex items-center">
                                    <WiStrongWind className="text-3xl" /> {weather.wind.speed} m/s
                                </span>
                            </div>

                            {/* Sunrise & Sunset */}
                            <div className="flex gap-4 text-gray-600">
                                <span className="flex items-center">
                                    <WiSunrise className="text-4xl text-orange-400" /> 07:35
                                </span>
                                <span className="flex items-center">
                                    <WiSunset className="text-4xl text-orange-600" /> 17:50
                                </span>
                            </div>

                            <div className="flex justify-center items-center gap-2">
                                <p className="text-sm text-gray-500">Last update: 15H22MIN</p>
                                <MdAccessTime className="text-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
            );
}