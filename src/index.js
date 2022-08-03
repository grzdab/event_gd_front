import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Site from './Site';
import { ContextProvider} from "./context/ContextProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



ReactDOM.render(
  <React.StrictMode>
      <Router>
        <ContextProvider>
          <Routes>
            <Route path="/*" element={ <Site />}></Route>
          </Routes>
        </ContextProvider>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);