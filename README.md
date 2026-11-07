# 🌤️ Weather App

A clean, animated weather app built with React. Search for any city with autocomplete, or use your current location, and get live weather conditions in a smooth, modern UI.

## ✨ Features

- 🔎 **City autocomplete** powered by the Geoapify API
- 📍 **Use your current location** via the browser Geolocation API (also detected automatically on load)
- 🌡️ Current temperature (feels like), weather description and icon
- 💧 Humidity and 💨 wind speed (km/h)
- 🌅 Sunrise and 🌇 sunset times
- 🕒 Local date and time of the observation
- 🎞️ Smooth animations with Framer Motion
- 🎨 Responsive UI styled with Tailwind CSS

## 🛠️ Built With

<p>
  <img src="https://skillicons.dev/icons?i=react,vite,js,html,css,tailwind" alt="Technologies used" />
</p>
**Animations:** Framer Motion (the only animation library used).

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or newer
- A free API key from [Geoapify](https://www.geoapify.com/) 
- A free API key from [OpenWeatherMap](https://openweathermap.org/api)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/HatimElbakkali/WeatherApp.git
cd WeatherApp

# 2. Install dependencies
npm install
```

### Environment variables

Create a `.env` file in the project root:

```env
VITE_GEO_API_KEY=your_geoapify_api_key
VITE_APP_WEATHER_API=your_openweathermap_api_key
```

> ⚠️ Never commit your `.env` file. Make sure it is listed in `.gitignore`.

### Run the app

```bash
npm run dev
```

Then open the URL printed in the terminal (for example `http://localhost:5174/WeatherApp/`).

### Build for production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── features/
│   └── weather/
│       └── weatherSlice.js   # Redux slice (setData / resetData)
├── SearchBar.jsx             # City autocomplete + geolocation button
├── Weather.jsx               # Weather card
└── main.jsx
```

## 🔄 How It Works

1. `SearchBar` asks the browser for your location on load, or lets you pick a city through Geoapify autocomplete.
2. The selected coordinates (`lat`, `lon`) are sent to the OpenWeatherMap `/data/2.5/weather` endpoint.
3. The response is stored in Redux with `setData`.
4. `Weather` reads the data from the store and renders the animated card.

## 📬 Connect

If you want to see more of my work or contact me:
Portfolio: [https://hatimelbakkali.web.app/](https://hatimelbakkali.web.app/)

Thank you!

---

Made with ❤️ by **Hatim Elbakkali**.