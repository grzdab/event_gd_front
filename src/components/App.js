import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../css/App.css';
import '../css/Form.css';
import '../css/datatables.css';
import sidebarToggler from '../js/scripts';
import LayoutSidebarLeft from "./layout/LayoutSidebarLeft.js";
import LayoutContent from "./layout/LayoutContent.js";
import Header from "./layout/Header";
import { DataTable } from "simple-datatables";
import Equipment from "./equipment/Equipment";
import Clients from "./clients/Clients";
import Events from "./events/Events";
import Dashboard from "./dashboard/Dashboard";
import EquipmentCategory from "./settings/EquipmentCategory";
import ClientType from "./settings/ClientType";

let simpleDataTable;

export function addScript(url, crossOrigin) {
    const script = document.createElement('script');
    script.src = url;
    script.async = false;
    script.crossOrigin = crossOrigin;
    document.body.appendChild(script);
}

const App = () => {

    const [appSettings, setAppSettings] = useState("localhost:3000/upload");

    // const [dataLoaded, setDataLoaded] = useState(1);
    // const [tableItemsList, setTableItemsList] = useState([]);

    // useEffect(()=>{
    //
    //     if (dataReady) {
    //         const datatablesSimple = document.getElementById('datatablesSimple');
    //         if (datatablesSimple) {
    //             console.log(simpleDataTable);
    //             if (simpleDataTable) {simpleDataTable.destroy();}
    //                 simpleDataTable = new DataTable(datatablesSimple, {
    //                     searchable: true,
    //                     columns: [{
    //                         select: 3, sortable: false,
    //                         render: function(data, cell, row) {
    //                             let id = row.cells.item(0).innerText;
    //                             let currentItem = JSON.parse(`{
    //                                 "id":"${row.cells.item(0).innerText}",
    //                                 "name":"${row.cells.item(1).innerText}",
    //                                 "description":"${row.cells.item(2).innerText}"}`)
    //                             return "" +
    //                                 "<Button class='btn btn-outline-info' onClick='console.log(&apos;" + currentItem + "&apos;)'><i class='fa fa-eye'></i></Button>&nbsp;" +
    //                                 "<Button class='btn btn-outline-danger' onClick='console.log(&apos;" + id + "&apos;)'><i class='fa fa-trash'></i></Button>";
    //                         }
    //                     }]
    //                 });
    //
    //            simpleDataTable.import({
    //                  type: "json",
    //                  data: JSON.stringify(tableItemsList)
    //            });
    //         }
    //     }
    // }, [tableItemsList])

    return (

    <Router>
        <div className='sb-nav-fixed'>
          <Header />
            <div id="layoutSidenav">
                <LayoutSidebarLeft />
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/clients' element={<Clients />} />
                    <Route path='/equipment' element={<Equipment appSettings={appSettings} setAppSettings={setAppSettings}/>} />
                    <Route path='/events' element={<Events />} />
                    <Route path='/equipment-category' element={<EquipmentCategory />}></Route>
                    <Route path='/client-type' element={<ClientType />}></Route>
                </Routes>
            </div>
            {addScript('https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js', 'anonymous')}
            {/*{addScript('https://cdn.jsdelivr.net/npm/simple-datatables@latest', 'anonymous')}*/}
            {/*{addScript('http://localhost:3000/datatables-simple-demo.js', '')}*/}
            <script src="http://localhost:3001/datatables-demo.js" />
            {/*<script src="./js/simple-databases.js" />*/}
        </div>
    </Router>
  );
}

export default App;