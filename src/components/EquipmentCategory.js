import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";

const EquipmentCategory = () => {

    const addEquipmentCategory = async (equipmentCategory) => {
        const response = await fetch('http://localhost:5111/categories', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(equipmentCategory)
        });
        const data = await response.json();
        setItems([...itemsList, data]);
    }

    const fetchEquipmentCategory = async (id) => {
        const response = await fetch(`http://localhost:5111/categories/${id}`);
        const data = await response.json();
        return data;
    }

    const updateEquipmentCategory = async (equipmentCategory) => {
        const updated = {
            name: equipmentCategoryName,
            description: equipmentCategoryDescription
        };
        const response = await fetch(`http://localhost:5111/categories/${equipmentCategory.id}`, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updated)
        });
        const data = await response.json();
        setItems(
            itemsList.map((item) =>
                item.id === equipmentCategory.id ? data : item));
    }

    const defaultItem = {
        "id": "",
        "name": "",
        "description": ""
    }

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [showDetails, setShowDetails] = useState(false);
    const [modalHeader, setModalHeader] = useState('Edit equipment category');
    const [modalDescription, setModalDescription] = useState('');
    const [showEquipmentInCategory, setShowEquipmentInCategory] = useState(false);
    const [addNew, setAddNew] = useState(false);
    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);


    const [itemsList, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(defaultItem);
    const [equipmentCategoryID, setEquipmentCategoryId] = useState('');
    const [equipmentCategoryName, setEquipmentCategoryName] = useState('');
    const [equipmentCategoryDescription, setEquipmentCategoryDescription] = useState('');

    const onSubmit = (e) => {
        e.preventDefault() // prevents from submitting to the page which is default behavior
        if(!equipmentCategoryName) {
            let nameInput = document.getElementById("name");
            nameInput.classList.add("form-input-invalid");
            nameInput.placeholder = "Category name cannot be empty"
            return;
        }
        if (addNew) {
            addEquipmentCategory({name: equipmentCategoryName, description: equipmentCategoryDescription})
                .then(() => handleCloseDetails());
        } else {
            updateEquipmentCategory({id: equipmentCategoryID, name: equipmentCategoryName, description: equipmentCategoryDescription})
                .then(() => handleCloseDetails());
        }
    }

    const handleCloseDetails = () => {
        setEquipmentCategoryId('');
        setEquipmentCategoryName('');
        setEquipmentCategoryDescription('');
        setShowDetails(false);
        setCurrentItem(defaultItem);
        setShowEquipmentInCategory(false);
        setAddNew(false);
        setSaveButtonDisabled(true);
    };

    useEffect(() => {
        const getCategories = async () => {
            const response = await fetch('http://localhost:5111/categories');
            const data = await response.json();
            if (response.status === 404) {
                setError('Categories data not found');
            }
            setItems(data);
            setLoading(false);
        }
        getCategories().catch(console.error);

    }, [])

    return (
        <div id="layoutSidenav_content">
            <div className="container-fluid px-4">
                <h1 className="mt-4">EQUIPMENT CATEGORIES</h1>
                <div className="container-fluid">
                    <div className="RAM_container">
                    <Button className="RAM_button" id="getData">Get data</Button>
                    <Button className="RAM_button" id="addData"
                            onClick={()=>{
                                setModalDescription('Here you can add new equipment category.');
                                setModalHeader('Add new equipment category');
                                setShowDetails(true);
                                setAddNew(true);
                            }}
                    >Add new equipment category</Button>
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-table me-1"></i>
                        Equipment categories list
                    </div>
                    { itemsList.length > 0 ? (
                    <div className="card-body">
                        <table id={"datatablesSimple"}>
                            <thead>
                            <tr>
                                <th>id</th>
                                <th>name</th>
                                <th>description</th>
                            </tr>
                            </thead>
                            <tbody>
                            {itemsList.map((e) => (
                                <tr key={e.id}>
                                    <td>{e.id}</td>
                                    <td>{e.name}</td>
                                    <td>{e.description}</td>
                                    <td><button className='btn btn-info' onClick={() => {
                                        setCurrentItem(e);
                                        setShowDetails(true);
                                        setAddNew(false);
                                        setShowEquipmentInCategory(true);
                                        setEquipmentCategoryId(e.id);
                                        setEquipmentCategoryName(e.name);
                                        setEquipmentCategoryDescription(e.description);
                                        setModalHeader("Edit equipment category");
                                        setModalDescription("");
                                    }}>View details</button></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>) : (
                            <h3> NO DATA FOUND. PLEASE ADD NEW EQUIPMENT CATEGORY. </h3>
                        )}
                </div>
            </div>
            {/*  ============== EQUIPMENT CATEGORY DETAILS MODAL: BEGIN ============== */}
            <Modal show={showDetails}
                   size="xl"
                   backdrop="static"
                   keyboard={false}
                   onHide={handleCloseDetails}>
                <Modal.Header className="form-header" closeButton closeVariant="white">
                    <Modal.Title>Equipment category details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section className="mb-4">
                        <h2 className="h1-responsive font-weight-bold text-center my-2">{ modalHeader }</h2>
                        <p className="text-center w-responsive mx-auto mb-5 form_test">{ modalDescription }</p>
                        <div className="row">
                            <div className="col-md-12 mb-md-0 mb-5">
                                <form id="add-equipment-category-form" name="add-equipment-category-form">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="md-form mb-0">
                                                <label htmlFor="name"
                                                       className="">Name</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    defaultValue={currentItem.name}
                                                    className="form-control"
                                                    required
                                                    onChange={(e) => {
                                                        setEquipmentCategoryName(e.target.value);
                                                        setSaveButtonDisabled(false);
                                                    }}
                                                ></input>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="md-form mb-0">
                                                <label htmlFor="description"
                                                       className="">Description</label>
                                                <textarea
                                                    type="text"
                                                    id="description"
                                                    name="description"
                                                    rows="2"
                                                    defaultValue={currentItem.description}
                                                    className="form-control md-textarea"
                                                    onChange={(e) => {
                                                        setEquipmentCategoryDescription(e.target.value);
                                                        setSaveButtonDisabled(false);
                                                    }}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    { showEquipmentInCategory &&
                                    <div className="row margin-top">
                                        <div className="col-md-12">
                                            <div className="md-form mb-0">
                                                <div className="card">
                                                    <div className="card-header">
                                                        Equipment in this category (TODO: fetch corresponding equipment)
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <input
                                                                    type="text"
                                                                    id="length"
                                                                    name="length"
                                                                    value={currentItem.length}
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    }
                                </form>
                            </div>
                        </div>
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetails}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSubmit} disabled={saveButtonDisabled}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            {/*  ============== EQUIPMENT CATEGORY DETAILS MODAL: END ============== */}
        </div>
    )


}

export default EquipmentCategory;