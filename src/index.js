import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from "./pages/Home"
import Menu from "./pages/Menu"
import MenuDetail from "./pages/Menu/MenuDetail"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/store/menu" component={Menu} />
        <Route path="/store/meal" component={MenuDetail} />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

reportWebVitals();
