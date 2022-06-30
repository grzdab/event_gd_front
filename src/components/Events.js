import React, {Component, useMemo} from 'react';
import { useState, useEffect } from 'react';
import BasicPagination from "./Pagination";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import {Fab} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
let tableData;

const Events = () => {

    const defaultItem = {
        "id": "",
        "property_name": ""
    }

    const [eventsList, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tableData, setItems] = useState([]);
    const [error, setError] = useState('');
    const [showDetails, setShowDetails] = useState(false);
    const [modalHeader, setModalHeader] = useState('Edit equipment');
    const [modalDescription, setModalDescription] = useState('');
    const [currentItem, setCurrentItem] = useState(defaultItem);
    const [currentPage, setCurrentPage] = useState(1);

    const handleCloseDetails = () => {
        setShowDetails(false);
        setCurrentItem(defaultItem);
    };
    const handleShowDetails = () => setShowDetails(true);

    useEffect(() => {
        const getEvents = async(pageNum =1) => {
            const response = await fetch(`http://localhost:8080/admin/language/languagePage/${pageNum}`);
            const data = await response.json();
            if (response.status === 404) {
                setError('Equipment data not found');
            }
            setItems(data);
            tableData = data;
            console.log(tableData);
            // console.log(itemsList);
            setLoading(false);
            // console.log(response);
        }
        getEvents().catch(console.error)
    }, []);

    const paginationSize = useMemo(() => {
        return Math.ceil(tableData.length / 10);
    });

    const fetchById = async (id) => {
        const response = await fetch(`http://localhost:8080/admin/language/${id}`);
        const data = await response.json();
        return data;
    }

    const addEvents = async (Events) => {
        const response = await fetch('http://localhost:8080/admin/language', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(Events)
        });

        const data = await response.json();
        setEvents([...eventsList, data]);
    }

    const deleteEvents = async (id) => {
        await fetch(`http://localhost:8080/admin/language/${id}`, {method: 'DELETE',});
        setEvents(eventsList.filter((Events) => Events.id !== id));
    }

    const toggleInUse = async (id) => {
        const Events = await fetchById(id);
        const updated = {...Events, inUse: !Events.inUse};
        const response = await fetch(`http://localhost:8080/admin/language/${id}`, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updated)
        })

        const data = await response.json();
        setEvents(
            eventsList.map((Events) =>
                Events.id === id ? {...Events, inUse: data.inUse} : Events));
    }

    console.log("EventsList");
    console.log(tableData);
    console.log("hardEventsList");
    // console.log(hardEventsList);

    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Events</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item active">Events list</li>
                    </ol>
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-table me-1"></i>
                            DataTable Example
                        </div>
                        <div className="card-body">
                            <table id="datatablesSimple">
                                <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Language
                                    </th>
                                    <th>Details</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tableData.map((e) => (
                                    <tr key={e.id}>
                                        <td>{e.id}</td>
                                        <td>{e.propertyName}</td>
                                        <td>
                                            <Fab
                                                variant='extended'
                                                size="small"
                                            color="inherit"
                                            aria-label="edit">
                                            <EditIcon />
                                        </Fab>
                                        </td>

                                        {/*<td><button className = "btn btn-info" onClick={() => alert("Eq:" + e.propertyName)}>View details</button></td>*/}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                                <Pagination
                                    count={paginationSize}                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    totalItems={tableData.length}
                                    itemPerPage={10}
                                    onChangePage={(pageNum) => setCurrentPage(pageNum)}
                                    boundaryCount={1}
                                    showFirstButton
                                    showLastButton />
                        </div>
                    </div>
                </div>
            </main>
            <footer className="py-4 bg-light mt-auto">
                <div className="container-fluid px-4">
                    <div className="d-flex align-items-center justify-content-between small">
                        <div className="text-muted">Copyright &copy; R.A.M. 2022</div>
                        <div>
                            <a href="#">Privacy Policy</a>
                            &middot;
                            <a href="#">Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );

}

export default Events;

