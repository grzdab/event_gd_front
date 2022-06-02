import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/App.css';
import './css/datatables.css';
import sidebarToggler from './js/scripts';
import LayoutSidebarLeft from "./components/LayoutSidebarLeft.js";
import LayoutContent from "./components/LayoutContent.js";
import Header from "./components/Header";
import { DataTable } from "simple-datatables";
import Equipment from "./components/Equipment";
import Clients from "./components/Clients";
import Events from "./components/Events";
import Main from "./components/Main";

export function addScript(url, crossOrigin) {
    const script = document.createElement('script');
    script.src = url;
    script.async = false;
    script.crossOrigin = crossOrigin;
    document.body.appendChild(script);
}

window.addEventListener('DOMContentLoaded', event => {
    const datatablesSimple = document.getElementById('datatablesSimple');
    if (datatablesSimple) {
        new DataTable(datatablesSimple);
    }
});


const App = () => {
    return (
    <Router>
        <div className='sb-nav-fixed'>
          <Header />
            <div id="layoutSidenav">
                <LayoutSidebarLeft />
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/clients' element={<Clients />} />
                    <Route path='/equipment' element={<Equipment />} />
                    <Route path='/events' element={<Events />} />
                </Routes>
            </div>
            {addScript('https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js', 'anonymous')}
            {/*{addScript('https://cdn.jsdelivr.net/npm/simple-datatables@latest', 'anonymous')}*/}
            {/*{addScript('http://localhost:3000/datatables-simple-demo.js', '')}*/}
            <script src="http://localhost:3001/datatables-demo.js" />

                {/*<script src="./js/simple-databases.js" />*/}
                {/*<script src="./js/datatables-demo.js" />*/}

        </div>
    </Router>
  );
}

export default App;