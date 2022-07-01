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
                                            <EditIcon
                                                onClick={()=>{
                                                    setModalDescription('Here you can edit language details.');
                                                    setModalHeader('Edit');
                                                    setShowDetails(true);
                                                }}
                                            />
                            {/*<Modal />*/}
                                        </Fab>
                                        </td>

                                        {/*<td><button className = "btn btn-info" onClick={() => alert("Eq:" + e.propertyName)}>View details</button></td>*/}
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
                                                value={tableData.propertyName}
                                                className="form-control" required
                                            />
                                        </div>
                                    </div>
                            {/*        <div className="row">*/}
                            {/*            <div className="col-md-8">*/}
                            {/*                <div className="md-form mb-0">*/}
                            {/*                    <label htmlFor="category" className="">Category <span*/}
                            {/*                        className="required">*</span></label>*/}
                            {/*                    <select className="form-select"*/}
                            {/*                            aria-label="Default select example"*/}
                            {/*                            defaultValue={"DEFAULT"}*/}
                            {/*                            required*/}
                            {/*                    >*/}
                            {/*                        <option disabled value="DEFAULT"> -- Select Category -- </option>*/}
                            {/*                        <option value="1">A</option>*/}
                            {/*                        <option value="2">B</option>*/}
                            {/*                        <option value="3">C</option>*/}
                            {/*                    </select>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*            <div className="col-md-4">*/}
                            {/*                <div className="md-form mb-0">*/}
                            {/*                    <label htmlFor="sequence" className="">Sequence<span*/}
                            {/*                        className="tooltiptext"></span></label>*/}
                            {/*                    <input*/}
                            {/*                        type="text"*/}
                            {/*                        id="sequence"*/}
                            {/*                        name="sequence"*/}
                            {/*                        value={tableData.id}*/}
                            {/*                        className="form-control"*/}
                            {/*                    />*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*        <div className="row">*/}
                            {/*            <div className="col-md-12">*/}
                            {/*                <div className="md-form mb-0">*/}
                            {/*                    <label htmlFor="description"*/}
                            {/*                           className="">Description</label>*/}
                            {/*                    <textarea*/}
                            {/*                        type="text"*/}
                            {/*                        id="description"*/}
                            {/*                        name="description"*/}
                            {/*                        rows="2"*/}
                            {/*                        value={currentItem.notes}*/}
                            {/*                        className="form-control md-textarea"*/}
                            {/*                    ></textarea>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <div className="col-md-4">*/}
                            {/*        <div className="md-form">*/}
                            {/*            <label htmlFor="photos">Photos</label>*/}
                            {/*            <textarea type="text" id="photos" name="photos" rows="2"*/}
                            {/*                      className="form-control md-textarea"></textarea>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            </div>
                            {/*<div className="row margin-top">*/}
                            {/*    <div className="col-md-7">*/}
                            {/*        <div className="md-form mb-0">*/}
                            {/*            <div className="card">*/}
                            {/*                <div className="card-header">*/}
                            {/*                    Technical data*/}
                            {/*                </div>*/}
                            {/*                <div className="card-body">*/}
                            {/*                    <div className="row">*/}
                            {/*                        <div className="col-md-6">*/}
                            {/*                            <label htmlFor="length" className="">Length*/}
                            {/*                                (cm)</label>*/}
                            {/*                            <input*/}
                            {/*                                type="text"*/}
                            {/*                                id="length"*/}
                            {/*                                name="length"*/}
                            {/*                                value={currentItem.length}*/}
                            {/*                                className="form-control"*/}
                            {/*                            />*/}
                            {/*                            <label htmlFor="width" className="">Width*/}
                            {/*                                (cm)</label>*/}
                            {/*                            <input*/}
                            {/*                                type="text"*/}
                            {/*                                id="width"*/}
                            {/*                                name="width"*/}
                            {/*                                value={currentItem.width}*/}
                            {/*                                className="form-control"*/}
                            {/*                            />*/}
                            {/*                            <label htmlFor="height>" className="">Height*/}
                            {/*                                (cm)</label>*/}
                            {/*                            <input*/}
                            {/*                                type="text"*/}
                            {/*                                id="height"*/}
                            {/*                                name="height"*/}
                            {/*                                value={currentItem.height}*/}
                            {/*                                className="form-control"*/}
                            {/*                            />*/}
                            {/*                        </div>*/}
                            {/*                        <div className="col-md-6">*/}
                            {/*                            <label htmlFor="area" className="">Area*/}
                            {/*                                (m<sup>2</sup>)</label>*/}
                            {/*                            <input*/}
                            {/*                                disabled*/}
                            {/*                                type="text"*/}
                            {/*                                id="area"*/}
                            {/*                                name="area"*/}
                            {/*                                value={currentItem.length * currentItem.width}*/}
                            {/*                                className="form-control"*/}
                            {/*                            />*/}
                            {/*                            <label htmlFor="weight" className="">Weight*/}
                            {/*                                (kg)</label>*/}
                            {/*                            <input*/}
                            {/*                                type="text"*/}
                            {/*                                id="weight"*/}
                            {/*                                name="weight"*/}
                            {/*                                value={currentItem.weight}*/}
                            {/*                                className="form-control"*/}
                            {/*                            />*/}
                            {/*                            <label htmlFor="power>" className="">Power*/}
                            {/*                                (kW)</label>*/}
                            {/*                            <input*/}
                            {/*                                type="text"*/}
                            {/*                                id="power"*/}
                            {/*                                name="power"*/}
                            {/*                                value={currentItem.powerRequired}*/}
                            {/*                                className="form-control"*/}
                            {/*                            />*/}
                            {/*                        </div>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <div className="col-md-3">*/}
                            {/*        <div className="card">*/}
                            {/*            <div className="card-header">*/}
                            {/*                Conditions*/}
                            {/*            </div>*/}
                            {/*            <div className="card-body">*/}
                            {/*                <label htmlFor="staff" className="">Required staff</label>*/}
                            {/*                <input*/}
                            {/*                    type="text"*/}
                            {/*                    id="staff"*/}
                            {/*                    name="staff"*/}
                            {/*                    value={currentItem.staffNeeded}*/}
                            {/*                    className="form-control"*/}
                            {/*                />*/}
                            {/*                <label htmlFor="minimum_age" className="">Minimum age</label>*/}
                            {/*                <input*/}
                            {/*                    type="text"*/}
                            {/*                    id="minimum_age"*/}
                            {/*                    name="minimum_age"*/}
                            {/*                    value={currentItem.minimumAge}*/}
                            {/*                    className="form-control"*/}
                            {/*                />*/}
                            {/*                <label htmlFor="max_participants>" className="">Max*/}
                            {/*                    participants</label>*/}
                            {/*                <input*/}
                            {/*                    type="text"*/}
                            {/*                    id="max_participants"*/}
                            {/*                    name="max_participants"*/}
                            {/*                    value={currentItem.maxParticipants}*/}
                            {/*                    className="form-control"*/}
                            {/*                />*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <div className="col-md-2">*/}
                            {/*        <div className="md-form mb-0">*/}
                            {/*            <div className="card">*/}
                            {/*                <div className="card-header">*/}
                            {/*                    Status*/}
                            {/*                </div>*/}
                            {/*                <div className="card-body">*/}
                            {/*                    <label htmlFor="in_use" className="">In use</label>*/}
                            {/*                    <input*/}
                            {/*                        type="text"*/}
                            {/*                        id="in_use"*/}
                            {/*                        name="in_use"*/}
                            {/*                        value={currentItem.inUse}*/}
                            {/*                        className="form-control"*/}
                            {/*                    />*/}
                            {/*                    <label htmlFor="ownership" className="">Ownership</label>*/}
                            {/*                    <input*/}
                            {/*                        type="text"*/}
                            {/*                        id="ownership"*/}
                            {/*                        name="ownership"*/}
                            {/*                        value="TODO"*/}
                            {/*                        className="form-control"*/}
                            {/*                    />*/}
                            {/*                    <label htmlFor="status" className="">Status</label>*/}
                            {/*                    <input*/}
                            {/*                        type="text"*/}
                            {/*                        id="status"*/}
                            {/*                        name="status"*/}
                            {/*                        value="TODO"*/}
                            {/*                        className="form-control"*/}
                            {/*                    />*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
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

