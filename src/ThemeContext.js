import { createContext } from "react";

// ([]) this part is like mimicking useState ([state, setStateFunction])
// just like a template, now it has "green" there just because let what type of value will be in
const ThemeContext = createContext(["green", () => {}]); 

export default ThemeContext;
