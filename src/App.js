import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { StrictMode } from "react";
import SearchParams from "./SearchParams";
import Details from "./Details";

// Link has to be always in BrowserRouter
// to pass id, use the useParams in the Details component 

const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
      <header>
        <Link to="/">Adopt Me!</Link>
      </header>
        <Routes> 
          <Route path="/details/:id" element={<Details />} />
          <Route path="/" element={<SearchParams />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  )
}

render(<App />, document.getElementById("root"));