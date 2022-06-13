import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/App.css';
import './css/Form.css';
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
import EquipmentDetails from "./components/EquipmentDetails";
import EquipmentCategory from "./components/EquipmentCategory";
import {faEye} from "@fortawesome/free-solid-svg-icons/faEye";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons/faTrashAlt";


let simpleDataTable;

export function addScript(url, crossOrigin) {
    const script = document.createElement('script');
    script.src = url;
    script.async = false;
    script.crossOrigin = crossOrigin;
    document.body.appendChild(script);
}

const App = () => {

    const [dataReady, setDataReady] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(1);
    const [tableItemsList, setTableItemsList] = useState([]);

    useEffect(()=>{

        if (dataReady) {
            // setDataReady(false);
            const datatablesSimple = document.getElementById('datatablesSimple');
            if (datatablesSimple) {
                console.log(simpleDataTable);
                if (simpleDataTable) {simpleDataTable.destroy();}
                    simpleDataTable = new DataTable(datatablesSimple, {
                        searchable: true,
                        columns: [{
                            select: 3,
                            render: function(data, cell, row) {
                                let id = row.cells.item(0).innerText;
                                return "" +
                                    "<Button class='btn btn-outline-info' onClick='console.log(&apos;" + id + "&apos;)'><FontAwesomeIcon icon={faEye}/>V</i></Button>&nbsp;" +
                                    "<Button class='btn btn-outline-danger' onClick='console.log(&apos;" + id + "&apos;)'><FontAwesomeIcon icon={faTrashAlt}/>D</Button>";
                            }
                        }]
                    });



                const dummy = [{
                    'Heading X': 'Value 1',
                    'Heading A': 'Value 2',
                    'Heading C': 'Value 3'
                },
                    {
                        'Heading X': 'Value 4',
                        'Heading A': 'Value 5',
                        'Heading C': 'Value 6'
                    }]


                const dummy1 = [
                    {
                        "id": "1-id",
                        "name": "A-name",
                        "description": "1-description"
                    },
                    {
                        "id": "evapNH8",
                        "name": "d",
                        "description": ""
                    },
                    {
                        "id": "LPogeF5",
                        "name": "fff",
                        "description": ""
                    }
                ]

               simpleDataTable.import({
                     type: "json",
                     data: JSON.stringify(tableItemsList)
                });
            }
            // const getDataButton = document.getElementById("getData");
            // if (getDataButton) {
            //     getDataButton.addEventListener("click", function() {
            //             if (datatablesSimple) {
            //                 simpleDataTable = new DataTable(datatablesSimple, {
            //                     searchable: true
            //                 });
            //                 // simpleDataTable.import({
            //                 //     type: "json",
            //                 //     data: JSON.stringify(tableData)
            //                 // });
            //             }
            //         }
            //     )};
        }
    }, [tableItemsList])


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
                    <Route path='/equipment/:id' element={<EquipmentDetails />}></Route>
                    <Route path='/events' element={<Events />} />
                    <Route path='/equipment-category' element={<EquipmentCategory
                        setDataReady={setDataReady}
                        dataLoaded={dataLoaded}
                        setDataLoaded={setDataLoaded}
                        tableItemsList={tableItemsList}
                        setTableItemsList={setTableItemsList}/>}
                    />
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