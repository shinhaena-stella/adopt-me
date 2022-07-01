import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { StrictMode, useState } from "react";
import ThemeContext from "./ThemeContext";
import SearchParams from "./SearchParams";
import Details from "./Details";

// Link has to be used always inner BrowserRouter
// to pass id, use the useParams in the Details component 
// Themecontext has to be outside of the componenets which share that theme

const App = () => {
  const theme = useState("pink") // this is the real value that I want to use with theme
  return (
    <StrictMode>
      <ThemeContext.Provider value={theme}>
        <BrowserRouter>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
          <Routes> 
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </StrictMode>
  )
}

render(<App />, document.getElementById("root"));