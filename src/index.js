import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Site from './Site';
import { AuthProvider} from "./context/AuthProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <AuthProvider>
              <Routes>
                  <Route path="/*" element={ <Site />}></Route>
              </Routes>
          </AuthProvider>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);