import React, {Component, useMemo} from 'react';
import { useState, useEffect } from 'react';
// import Modal from "./Modal";
import Pagination from "@mui/material/Pagination";
import {Fab} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
let tableData;
let setData;

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
    const [languageName, setLanguageName] = useState('');



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
                            Language - Admin section
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
                                            <EditIcon
                                                onClick={()=>{
                                                    setModalDescription('Here you can edit language details.');
                                                    setModalHeader('Edit');
                                                    setShowDetails(true);
                                                    setLanguageName(e.propertyName);
                                                }}
                                            />
                                        </Fab>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <Pagination
                                    count={10}
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    totalItems={tableData.length}
                                    itemPerPage={10}
                                    onChangePage={(pageNum) => setCurrentPage(pageNum)}
                                    boundaryCount={1}
                                    showFirstButton
                                    showLastButton
                            />
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

    {/*  ============== EQUIPMENT DETAILS MODAL: BEGIN ============== */}
    <Modal show={showDetails}
           size="xl"
           backdrop="static"
           keyboard={false}
           onHide={handleCloseDetails}>
        <Modal.Header className="form-header" closeButton closeVariant="white">
            <Modal.Title>Language details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <section className="mb-4">
                <h2 className="h1-responsive font-weight-bold text-center my-2">{ modalHeader }</h2>
                <p className="text-center w-responsive mx-auto mb-5 form_test">{ modalDescription }
                </p>
                <div className="row">
                    <div className="col-md-12 mb-md-0 mb-5">
                        <form id="add-equipment-form" name="add-equipment-form" action="" method="POST">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="md-form mb-0">
                                            <label htmlFor="name" className="">Language <span
                                                className="required">*</span></label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={ languageName }
                                                className="form-control" required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetails}>
                Close
            </Button>
            <Button variant="primary" onClick={handleCloseDetails}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
    {/*  ============== EQUIPMENT DETAILS MODAL: END ============== */}
        </div>
    );
}

export default Events;

