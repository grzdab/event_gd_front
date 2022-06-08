import React, {useEffect, useState} from 'react';
import '../css/Form.css';
import {DataTable} from "simple-datatables";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import AddEquipment from "./AddEquipment";
import {Link} from "react-router-dom";
let simpleDataTable;
let tableData;



const Equipment = () => {

    const defaultItem = {
        "id": "",
        "sortingId": 0,
        "name": "",
        "notes": "",
        "width": 0,
        "length": 0,
        "height": 0,
        "weight": 0,
        "powerRequired": 0,
        "staffNeeded": 0,
        "minimumAge": 0,
        "maxParticipants": 0,
        "equipmentCategoryId": 0,
        "inUse": false
    }
    const [loading, setLoading] = useState(true);
    const [itemsList, setItems] = useState([]);
    const [error, setError] = useState('');
    const [showDetails, setShowDetails] = useState(false);
    const [modalHeader, setModalHeader] = useState('Edit equipment');
    const [modalDescription, setModalDescription] = useState('');
    const [currentItem, setCurrentItem] = useState(defaultItem);

    const handleCloseDetails = () => {
        setShowDetails(false);
        setCurrentItem(defaultItem);
    };
    const handleShowDetails = () => setShowDetails(true);

    useEffect(() => {
        const getEquipment = async () => {
            const response = await fetch('http://localhost:5111/equipment');
            const data = await response.json();
            if (response.status === 404) {
                setError('Equipment data not found');
            }
            setItems(data);
            tableData = data;
            console.log(itemsList);
            setLoading(false);
        }
        getEquipment().catch(console.error);
    }, [])

    return (
        <div id="layoutSidenav_content">
            <div className="container-fluid px-4">
                <h1 className="mt-4">CONTENT</h1>
                <Button id="getData">Get data</Button>
                <Button id="addData"
                        onClick={()=>{
                            setModalDescription('Here you can add new equipment. Name and equipment category are required for the application to properly use the equipment. You can add remaining properties at any time.');
                            setModalHeader('Add new equipment');
                            setShowDetails(true);
                        }}
                >Add new equipment</Button>
                <h3>Equipment: { itemsList.length > 0 ? "?" : itemsList.length }</h3>
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-table me-1"></i>
                            Equipment list
                    </div>
                    <div className="card-body">
                        <table id={"datatablesSimple"}>
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>description</th>
                                </tr>
                            </thead>
                            <tbody>
                            {itemsList.map((e) => (
                                <tr key={e.id}>
                                    <td>{e.name}</td>
                                    <td>{e.notes}</td>
                                    {/*<td><Link to={`/equipment/${e.id}`}>View Details</Link></td>*/}
                                    <td><button className='btn btn-info' onClick={() => {
                                        setCurrentItem(e);
                                        setShowDetails(true);
                                        setModalHeader("Edit equipment");
                                        setModalDescription("");
                                    }}>View details</button></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/*  ============== EQUIPMENT DETAILS MODAL: BEGIN ============== */}
            <Modal show={showDetails}
                   size="xl"
                   backdrop="static"
                   keyboard={false}
                   onHide={handleCloseDetails}>
                <Modal.Header className="form-header" closeButton closeVariant="white">
                    <Modal.Title>Equipment details</Modal.Title>
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
                                                    <label htmlFor="name" className="">Equipment name <span
                                                        className="required">*</span></label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        value={currentItem.name}
                                                        className="form-control" required
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <div className="md-form mb-0">
                                                        <label htmlFor="category" className="">Category <span
                                                            className="required">*</span></label>
                                                        <select className="form-select"
                                                                aria-label="Default select example"
                                                                defaultValue={"DEFAULT"}
                                                                required
                                                        >
                                                            <option disabled value="DEFAULT"> -- Select Category -- </option>
                                                            <option value="1">A</option>
                                                            <option value="2">B</option>
                                                            <option value="3">C</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="md-form mb-0">
                                                        <label htmlFor="sequence" className="">Sequence<span
                                                            className="tooltiptext"></span></label>
                                                        <input
                                                            type="text"
                                                            id="sequence"
                                                            name="sequence"
                                                            value={currentItem.sortingId}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="md-form mb-0">
                                                        <label htmlFor="description"
                                                               className="">Description</label>
                                                        <textarea
                                                            type="text"
                                                            id="description"
                                                            name="description"
                                                            rows="2"
                                                            value={currentItem.notes}
                                                            className="form-control md-textarea"
                                                        ></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="md-form">
                                                <label htmlFor="photos">Photos</label>
                                                <textarea type="text" id="photos" name="photos" rows="2"
                                                          className="form-control md-textarea"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row margin-top">
                                        <div className="col-md-7">
                                            <div className="md-form mb-0">
                                                <div className="card">
                                                    <div className="card-header">
                                                        Technical data
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label htmlFor="length" className="">Length
                                                                    (cm)</label>
                                                                <input
                                                                    type="text"
                                                                    id="length"
                                                                    name="length"
                                                                    value={currentItem.length}
                                                                    className="form-control"
                                                                />
                                                                <label htmlFor="width" className="">Width
                                                                    (cm)</label>
                                                                <input
                                                                    type="text"
                                                                    id="width"
                                                                    name="width"
                                                                    value={currentItem.width}
                                                                    className="form-control"
                                                                />
                                                                <label htmlFor="height>" className="">Height
                                                                    (cm)</label>
                                                                <input
                                                                    type="text"
                                                                    id="height"
                                                                    name="height"
                                                                    value={currentItem.height}
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="area" className="">Area
                                                                    (m<sup>2</sup>)</label>
                                                                <input
                                                                    disabled
                                                                    type="text"
                                                                    id="area"
                                                                    name="area"
                                                                    value={currentItem.length * currentItem.width}
                                                                    className="form-control"
                                                                />
                                                                <label htmlFor="weight" className="">Weight
                                                                    (kg)</label>
                                                                <input
                                                                    type="text"
                                                                    id="weight"
                                                                    name="weight"
                                                                    value={currentItem.weight}
                                                                    className="form-control"
                                                                />
                                                                <label htmlFor="power>" className="">Power
                                                                    (kW)</label>
                                                                <input
                                                                    type="text"
                                                                    id="power"
                                                                    name="power"
                                                                    value={currentItem.powerRequired}
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="card">
                                                <div className="card-header">
                                                    Conditions
                                                </div>
                                                <div className="card-body">
                                                    <label htmlFor="staff" className="">Required staff</label>
                                                    <input
                                                        type="text"
                                                        id="staff"
                                                        name="staff"
                                                        value={currentItem.staffNeeded}
                                                        className="form-control"
                                                    />
                                                    <label htmlFor="minimum_age" className="">Minimum age</label>
                                                    <input
                                                        type="text"
                                                        id="minimum_age"
                                                        name="minimum_age"
                                                        value={currentItem.minimumAge}
                                                        className="form-control"
                                                    />
                                                    <label htmlFor="max_participants>" className="">Max
                                                        participants</label>
                                                    <input
                                                        type="text"
                                                        id="max_participants"
                                                        name="max_participants"
                                                        value={currentItem.maxParticipants}
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="md-form mb-0">
                                                <div className="card">
                                                    <div className="card-header">
                                                        Status
                                                    </div>
                                                    <div className="card-body">
                                                        <label htmlFor="in_use" className="">In use</label>
                                                        <input
                                                            type="text"
                                                            id="in_use"
                                                            name="in_use"
                                                            value={currentItem.inUse}
                                                            className="form-control"
                                                        />
                                                        <label htmlFor="ownership" className="">Ownership</label>
                                                        <input
                                                            type="text"
                                                            id="ownership"
                                                            name="ownership"
                                                            value="TODO"
                                                            className="form-control"
                                                        />
                                                        <label htmlFor="status" className="">Status</label>
                                                        <input
                                                            type="text"
                                                            id="status"
                                                            name="status"
                                                            value="TODO"
                                                            className="form-control"
                                                        />
                                                    </div>
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
    )
}

export default Equipment;