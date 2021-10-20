import React from "react"
import ReactDOM from "react-dom"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from 'react-query'
import { LiffProvider } from 'react-liff'
import { Provider } from 'react-redux'
import store from './redux/store'
import Home from "./pages/Home"
import Menu from "./pages/Menu"
import Cart from './pages/Cart'
import MenuDetail from "./pages/Menu/MenuDetail"
import "./index.css"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const queryClient = new QueryClient()
const liffId = '1656378783-Znq3ayNl';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <LiffProvider liffId={liffId}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <QueryClientProvider client={queryClient}>
            <Router>
              <Route exact path="/" component={Home} />
              <Route path="/store/menu/:storeCode" component={Menu} />
              <Route path="/store/meal/:mealId" component={MenuDetail} />
              <Route path="/cart" component={Cart} />
            </Router>
          </QueryClientProvider>
        </LocalizationProvider>
      </LiffProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

reportWebVitals();
