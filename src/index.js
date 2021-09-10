import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from "./pages/Home"
import Menu from "./pages/Menu"

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Route exact path="/" component={Home} />
        <Route path="/store/menu" component={Menu} />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
