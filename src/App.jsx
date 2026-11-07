import SearchBar from "./components/SearchBar.jsx"
import Weather from "./components/Weather.jsx"
import { Provider } from "react-redux"
import { store } from "./app/store/index.js"
function App() {
  return (
    <>
      <Provider store={store}>  
      <SearchBar/>
      <Weather/>
      </Provider>
    </>
  )
}

export default App