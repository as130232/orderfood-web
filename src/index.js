import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from "./pages/Home"
import Menu from "./pages/Menu"
import MenuDetail from "./pages/Menu/MenuDetail"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { LiffProvider } from 'react-liff';

const queryClient = new QueryClient()
const liffId = '1656378783-Znq3ayNl';

ReactDOM.render(
  <React.StrictMode>
    <LiffProvider liffId={liffId}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/store/menu" component={Menu} />
          <Route path="/store/meal" component={MenuDetail} />
        </Router>
      </QueryClientProvider>
    </LiffProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

reportWebVitals();
