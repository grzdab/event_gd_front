import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Site from './Site';
import { ContextProvider} from "./context/ContextProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./components/app/component_test/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <Router>
        <ContextProvider>
          <Routes>
            <Route path="/*" element={ <Site />}></Route>
          </Routes>
        </ContextProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);