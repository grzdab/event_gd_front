import React, {Component} from 'react';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Equipment = () => {

    const [equipmentList, setEquipment] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const handleCloseDetails = () => setShowDetails(false);
    const handleShowDetails = () => setShowDetails(true);


    useEffect(() => {
        const getEquipment = async() => {
            const data = await fetchEquipment();
            setEquipment(data);
        }
        getEquipment();
    }, []);

    const fetchEquipment = async () => {
        const response = await fetch('http://localhost:5111/equipment');
        const data = await response.json();
        return data;
    }

    // hardcoded version
    const [hardEquipmentList, setHardEquipment] = useState([
        {
            "id": "20e3d71-cd82-6add-4aca-7ae387b860bc2",
            "sortingId": 64,
            "name": "Equipment 64",
            "notes": "Equipment 64 detailed description",
            "width": 5,
            "length": 12,
            "height": 3,
            "weight": 251,
            "powerRequired": 678,
            "staffNeeded": 3,
            "minimumAge": 5,
            "maxParticipants": 13,
            "equipmentCategoryId": 13,
            "inUse": true

        },
        {
            "id": "e3e5805-5d01-ae2d-1a7c-b2aabacce5d86",
            "sortingId": 12,
            "name": "Equipment 12",
            "notes": "Equipment 12 detailed description",
            "width": 6,
            "length": 4,
            "height": 1,
            "weight": 42,
            "powerRequired": 1784,
            "staffNeeded": 3,
            "minimumAge": 12,
            "maxParticipants": 12,
            "equipmentCategoryId": 17,
            "inUse": true

        },
        {
            "id": "d8abd0a-b5ce-1e7b-bcd2-b11e2bb86b4bd",
            "sortingId": 69,
            "name": "Equipment 69",
            "notes": "Equipment 69 detailed description",
            "width": 8,
            "length": 12,
            "height": 1,
            "weight": 198,
            "powerRequired": 2784,
            "staffNeeded": 0,
            "minimumAge": 2,
            "maxParticipants": 8,
            "equipmentCategoryId": 19,
            "inUse": true
        },
        {
            "id": "12a6228-65d6-8057-3ccd-1ec2bd8d45c4e",
            "sortingId": 93,
            "name": "Equipment 93",
            "notes": "Equipment 93 detailed description",
            "width": 7,
            "length": 13,
            "height": 2,
            "weight": 259,
            "powerRequired": 641,
            "staffNeeded": 4,
            "minimumAge": 11,
            "maxParticipants": 9,
            "equipmentCategoryId": 17,
            "inUse": false
        },
        {
            "id": "2bdaee2-bee8-7e84-53a0-becb33574daaa",
            "sortingId": 98,
            "name": "Equipment 98",
            "notes": "Equipment 98 detailed description",
            "width": 9,
            "length": 3,
            "height": 2,
            "weight": 30,
            "powerRequired": 1772,
            "staffNeeded": 5,
            "minimumAge": 6,
            "maxParticipants": 8,
            "equipmentCategoryId": 17,
            "inUse": true
        },
        {
            "id": "4cbe7bc-ae16-8574-038c-5babee56ed4a8",
            "sortingId": 84,
            "name": "Equipment 84",
            "notes": "Equipment 84 detailed description",
            "width": 1,
            "length": 3,
            "height": 1,
            "weight": 212,
            "powerRequired": 1068,
            "staffNeeded": 3,
            "minimumAge": 3,
            "maxParticipants": 8,
            "equipmentCategoryId": 1,
            "inUse": true
        },
        {
            "id": "7ab02bd-3582-dc70-b634-dc7baca58ee74",
            "sortingId": 71,
            "name": "Equipment 71",
            "notes": "Equipment 71 detailed description",
            "width": 1,
            "length": 1,
            "height": 1,
            "weight": 92,
            "powerRequired": 2113,
            "staffNeeded": 0,
            "minimumAge": 0,
            "maxParticipants": 10,
            "equipmentCategoryId": 1,
            "inUse": true
        },
        {
            "id": "ec6056b-33b8-25e5-1740-c47e114da5d5e",
            "sortingId": 6,
            "name": "Equipment 6",
            "notes": "Equipment 6 detailed description",
            "width": 3,
            "length": 14,
            "height": 3,
            "weight": 278,
            "powerRequired": 1955,
            "staffNeeded": 1,
            "minimumAge": 6,
            "maxParticipants": 12,
            "equipmentCategoryId": 15,
            "inUse": true
        },
        {
            "id": "c4ee8bc-c4da-e4c1-bd44-55b1bb822aa55",
            "sortingId": 76,
            "name": "Equipment 76",
            "notes": "Equipment 76 detailed description",
            "width": 9,
            "length": 11,
            "height": 2,
            "weight": 284,
            "powerRequired": 1459,
            "staffNeeded": 0,
            "minimumAge": 9,
            "maxParticipants": 8,
            "equipmentCategoryId": 6,
            "inUse": false
        },
        {
            "id": "b6114d2-e1a5-70e1-de8a-0252a0cc84ca7",
            "sortingId": 2,
            "name": "Equipment 2",
            "notes": "Equipment 2 detailed description",
            "width": 6,
            "length": 1,
            "height": 2,
            "weight": 71,
            "powerRequired": 603,
            "staffNeeded": 3,
            "minimumAge": 12,
            "maxParticipants": 5,
            "equipmentCategoryId": 7,
            "inUse": true
        }
    ]);

    const fetchById = async (id) => {
        const response = await fetch(`http://localhost:5111/equipment/${id}`);
        const data = await response.json();
        return data;
    }

    const addEquipment = async (equipment) => {
        const response = await fetch('http://localhost:5111/equipment', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(equipment)
        });

        const data = await response.json();
        setEquipment([...equipmentList, data]);
    }

    const deleteEquipment = async (id) => {
        await fetch(`http://localhost:5111/equipment/${id}`, {method: 'DELETE',});
        setEquipment(equipmentList.filter((equipment) => equipment.id !== id));
    }

    const toggleInUse = async (id) => {
        const equipment = await fetchById(id);
        const updated = {...equipment, inUse: !equipment.inUse};
        const response = await fetch(`http://localhost:5555/equipment/${id}`, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updated)
        })

        const data = await response.json();
        setEquipment(
            equipmentList.map((equipment) =>
                equipment.id === id ? {...equipment, inUse: data.inUse} : equipment));
    }


    return (
        <div id="layoutSidenav_content">
            <Modal show={showDetails}
                   backdrop="static"
                   keyboard={false}
                   onHide={handleCloseDetails}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new equipment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Equipment name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="enter equipment name"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
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
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Equipment</h1>
                    <button className="btn btn-primary" onClick={handleShowDetails}>Add equipment</button>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item active">Equipment list</li>
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
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Required Area (m<sup>2</sup>)</th>
                                    <th>In Use</th>
                                    <th>Details</th>
                                </tr>
                                </thead>
                                <tbody>
                                {hardEquipmentList.map((e) => (
                                     <tr key={e.id}>
                                         <td>{e.name}</td>
                                         <td>{e.notes}</td>
                                         <td>{e.width * e.length}</td>
                                         <td>{e.inUse ? "Yes" : "No"}</td>
                                         <td><button className = "btn btn-info" onClick={handleShowDetails}>View details</button></td>
                                     </tr>
                                 ))}
                                </tbody>
                            </table>
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

export default Equipment;