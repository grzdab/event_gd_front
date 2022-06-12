import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons/faEye";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons/faExclamationCircle";


const Backup = () => {

// console.log("Render")
//
//     const defaultItem = {
//         "id": "",
//         "name": "",
//         "description": ""
//     }
//
//     const defaultFormState = {
//         "showDetails": false,
//         "showDeleteWarning": false
//     }
//
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//
//     const [currentFormState, setCurrentFormState] = useState(defaultFormState);
//
//     const [showDetails, setShowDetails] = useState(false);
//     const [showDeleteWarning, setShowDeleteWarning] = useState(false);
//     const [showChangesWarning, setChangesWarning] = useState(false);
//     const [modalHeader, setModalHeader] = useState('Edit equipment category');
//     const [modalDescription, setModalDescription] = useState('');
//     const [modalDataChanged, setModalDataChanged] = useState('Data has been changed');
//     const [showEquipmentInCategory, setShowEquipmentInCategory] = useState(false);
//     const [addNew, setAddNew] = useState(false);
//     const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
//
//     const [itemsList, setItems] = useState([]);
//     const [currentItem, setCurrentItem] = useState(defaultItem);
//     const [backupItem, setBackupItem] = useState(defaultItem);
//
//     const [equipmentCategoryID, setEquipmentCategoryId] = useState('');
//     const [equipmentCategoryName, setEquipmentCategoryName] = useState('');
//     const [equipmentCategoryDescription, setEquipmentCategoryDescription] = useState('');
//
//     const delay = (time) => {
//         return new Promise(resolve => setTimeout(resolve, time));
//     }
//
//     const compareData = (e, name) => {
//         if (currentItem[name] !== e.target.value) {
//             document.getElementById("data-changed").classList.add("visible");
//             setSaveButtonDisabled(false);
//         } else {
//             document.getElementById("data-changed").classList.remove("visible");
//             setSaveButtonDisabled(true);
//         }
//     }
//
//     const addEquipmentCategory = async (equipmentCategory) => {
//         const response = await fetch('http://localhost:5111/categories', {
//             method: 'POST',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify(equipmentCategory)
//         });
//         const data = await response.json();
//         setItems([...itemsList, data]);
//     }
//
//     const onSubmit = (e) => {
//         e.preventDefault() // prevents from submitting to the page which is default behavior
//         if(!equipmentCategoryName) {
//             let nameInput = document.getElementById("name");
//             nameInput.classList.add("form-input-invalid");
//             nameInput.placeholder = "Category name cannot be empty"
//             return;
//         }
//         if (addNew) {
//             addEquipmentCategory({name: equipmentCategoryName, description: equipmentCategoryDescription})
//                 .then(() => onCloseDetails());
//         } else {
//             updateEquipmentCategory({id: equipmentCategoryID, name: equipmentCategoryName, description: equipmentCategoryDescription})
//                 .then(() => onCloseDetails());
//         }
//     }
//
//     const onDelete = (e) => {
//         e.preventDefault() // prevents from submitting to the page which is default behavior
//         deleteEquipmentCategory(currentItem.id).then(() => {
//             handleCloseWarning();
//             // setShowDetails(false);
//             setCurrentFormState({...currentFormState, showDeleteWarning: false})
//         });
//     }
//
//     const fetchEquipmentCategory = async (id) => {
//         const response = await fetch(`http://localhost:5111/categories/${id}`);
//         const data = await response.json();
//         return data;
//     }
//
//     const updateEquipmentCategory = async (equipmentCategory) => {
//         const updated = {
//             name: equipmentCategoryName,
//             description: equipmentCategoryDescription
//         };
//         const response = await fetch(`http://localhost:5111/categories/${equipmentCategory.id}`, {
//             method: 'PUT',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify(updated)
//         });
//         const data = await response.json();
//         setItems(
//             itemsList.map((item) =>
//                 item.id === equipmentCategory.id ? data : item));
//     }
//
//     const deleteEquipmentCategory = async (id) => {
//         await fetch(`http://localhost:5111/categories/${id}`, {method: 'DELETE',});
//         setItems(itemsList.filter((equipmentCategory) => equipmentCategory.id !== id));
//     }
//
//     const clearCurrentItem = () => {
//         setEquipmentCategoryId('');
//         setEquipmentCategoryName('');
//         setEquipmentCategoryDescription('');
//         setCurrentItem(defaultItem);
//     }
//
//     const handleCloseWarning = () => {
//         // setShowDeleteWarning(false);
//         setCurrentFormState({...currentFormState, showDeleteWarning: false})
//         // if (!showDetails) {
//         if (!currentFormState.showDetails) {
//             clearCurrentItem();
//             setAddNew(false);
//             setSaveButtonDisabled(true);
//             setShowEquipmentInCategory(false);
//         }
//     };
//
//     const onCloseDetails = () => {
//         // setShowDetails(false);
//         setCurrentFormState({...currentFormState, showDetails: false})
//         clearCurrentItem();
//         setShowEquipmentInCategory(false);
//         setSaveButtonDisabled(true);
//         delay(250).then(() => setAddNew(false)); // TODO make it prettier!
//     };
//
//     useEffect(() => {
//         const getCategories = async () => {
//             const response = await fetch('http://localhost:5111/categories');
//             const data = await response.json();
//             if (response.status === 404) {
//                 setError('Categories data not found');
//             }
//             setItems(data);
//             setLoading(false);
//         }
//         getCategories().catch(console.error);
//
//     }, [])
//
//     return (
//         <div id="layoutSidenav_content">
//             <div className="container-fluid px-4">
//                 <h1 className="mt-4">EQUIPMENT CATEGORIES</h1>
//                 <div className="container-fluid">
//                     <div className="RAM_container">
//                         <Button className="RAM_button" id="getData">Get data</Button>
//                         <Button className="RAM_button" id="addData"
//                                 onClick={()=>{
//
//                                     setModalDescription('Here you can add new equipment category.');
//                                     setModalHeader('Add new equipment category');
//                                     setCurrentFormState({...currentFormState, showDetails: true})
//                                     setShowDetails(true);
//                                     clearCurrentItem();
//                                     setAddNew(true);
//                                 }}
//                         >Add new equipment category</Button>
//                     </div>
//                 </div>
//                 <div className="card mb-4">
//                     <div className="card-header">
//                         <i className="fas fa-table me-1"></i>
//                         Equipment categories list
//                     </div>
//                     { itemsList.length > 0 ? (
//                         <div className="card-body">
//                             <table id={"datatablesSimple"}>
//                                 <thead>
//                                 <tr>
//                                     <th>id</th>
//                                     <th>name</th>
//                                     <th>description</th>
//                                 </tr>
//                                 </thead>
//                                 <tbody>
//                                 {itemsList.map((e) => (
//                                     <tr key={e.id}>
//                                         <td>{e.id}</td>
//                                         <td>{e.name}</td>
//                                         <td>{e.description}</td>
//                                         <td><button className='btn btn-outline-info' onClick={() => {
//                                             setCurrentItem(e);
//                                             // setShowDetails(true);
//                                             setCurrentFormState({...currentFormState, showDetails: true})
//                                             setAddNew(false);
//                                             setShowEquipmentInCategory(true);
//                                             setEquipmentCategoryId(e.id);
//                                             setEquipmentCategoryName(e.name);
//                                             setEquipmentCategoryDescription(e.description);
//                                             setModalHeader("Edit equipment category");
//                                             setModalDescription("");
//                                         }}><FontAwesomeIcon icon={faEye}/></button></td>
//                                         <td><button className='btn btn-outline-danger' onClick={() => {
//                                             setCurrentItem(e);
//                                             // setShowDeleteWarning(true);
//                                             setCurrentFormState({...currentFormState, showDeleteWarning: true})
//                                             setEquipmentCategoryId(e.id);
//                                             setEquipmentCategoryName(e.name);
//                                             setEquipmentCategoryDescription(e.description);
//                                         }}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
//                                     </tr>
//                                 ))}
//                                 </tbody>
//                             </table>
//                         </div>) : (
//                         <h6> NO DATA FOUND. PLEASE ADD NEW EQUIPMENT CATEGORY. </h6>
//                     )}
//                 </div>
//             </div>
//             <Modal
//                 show={currentFormState.showDeleteWarning}
//                 onHide={handleCloseWarning}
//                 backdrop="static"
//                 keyboard={false}
//             >
//
//                 {/*  ============== WARNING MODAL: BEGIN ============== */}
//                 <Modal.Header className="form-header-warning" closeButton closeVariant="white">
//                     <Modal.Title>Warning</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     Are you sure you want to delete this category? This operation cannot be undone!
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleCloseWarning}>
//                         Cancel
//                     </Button>
//                     <Button variant="danger" onClick={onDelete}>Delete</Button>
//                 </Modal.Footer>
//             </Modal>
//             {/*  ============== WARNING MODAL: END ============== */}
//
//             {/*  ============== EQUIPMENT CATEGORY DETAILS MODAL: BEGIN ============== */}
//             {/*<Modal show={ showDetails }*/}
//             <Modal show={ currentFormState.showDetails }
//                    size="xl"
//                    backdrop="static"
//                    keyboard={false}
//                    onHide={onCloseDetails}>
//                 <Modal.Header className="form-header" closeButton closeVariant="white">
//                     <Modal.Title>Equipment category details</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <section className="mb-4">
//                         <h2 className="h1-responsive font-weight-bold text-center my-2">{ modalHeader }</h2>
//                         <p className="text-center w-responsive mx-auto mb-5 form_test">{ modalDescription }</p>
//                         <p className="text-center w-responsive mx-auto mb-5 data_changed" id="data-changed"><FontAwesomeIcon icon={faExclamationCircle}/>&nbsp;{ modalDataChanged }</p>
//                         <div className="row">
//                             <div className="col-md-12 mb-md-0 mb-5">
//                                 <form id="add-equipment-category-form" name="add-equipment-category-form">
//                                     <div className="row">
//                                         <div className="col-md-12">
//                                             <div className="md-form mb-0">
//                                                 <label htmlFor="name"
//                                                        className="">Name</label>
//                                                 <input
//                                                     type="text"
//                                                     id="name"
//                                                     name="name"
//                                                     defaultValue={currentItem.name}
//                                                     className="form-control"
//                                                     required
//                                                     onChange={(e) => {
//                                                         setEquipmentCategoryName(e.target.value);
//                                                         setSaveButtonDisabled(false);
//                                                         if (!addNew) {
//                                                             compareData(e, "name")
//                                                             // console.log(e.target.value);
//                                                         }
//                                                     }}
//                                                     onClick={() => {
//                                                         const b = document.getElementById("name");
//                                                         b.placeholder = "";
//                                                         b.classList.remove("form-input-invalid");
//                                                     }}
//                                                 ></input>
//                                             </div>
//                                         </div>
//                                         <div className="col-md-12">
//                                             <div className="md-form mb-0">
//                                                 <label htmlFor="description"
//                                                        className="">Description</label>
//                                                 <textarea
//                                                     type="text"
//                                                     id="description"
//                                                     name="description"
//                                                     rows="3"
//                                                     defaultValue={currentItem.description}
//                                                     className="form-control md-textarea"
//                                                     onChange={(e) => {
//                                                         setEquipmentCategoryDescription(e.target.value);
//                                                         setSaveButtonDisabled(false);
//                                                     }}
//                                                 ></textarea>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     { !addNew &&
//                                         <div className="row margin-top">
//                                             <div className="col-md-12">
//                                                 <div className="md-form mb-0">
//                                                     <div className="card">
//                                                         <div className="card-header">
//                                                             Equipment in this category (TODO: fetch corresponding equipment)
//                                                         </div>
//                                                         <div className="card-body">
//                                                             <div className="row">
//                                                                 <div className="col-md-12">
//                                                                     <input
//                                                                         type="text"
//                                                                         id="length"
//                                                                         name="length"
//                                                                         value={currentItem.length}
//                                                                         className="form-control"
//                                                                     />
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     }
//                                 </form>
//                             </div>
//                         </div>
//                     </section>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <div className="form-confirm-delete" id="confirm-delete">
//                         Confirm delete? (This operation cannot be undone)
//                         <Button variant="secondary" onClick={() => {
//                             document.getElementById("confirm-delete").style.visibility="hidden";
//                             document.getElementById("btn-delete").style.visibility="visible";
//                         }}>
//                             No
//                         </Button>
//                         <Button variant="danger" onClick={onDelete}>
//                             Confirm
//                         </Button>
//                     </div>
//                     {!addNew &&
//                         <Button variant="danger" id="btn-delete" onClick={() => {
//                             document.getElementById("confirm-delete").style.visibility = "visible";
//                             document.getElementById("btn-delete").style.visibility = "hidden";
//                         }}>
//                             Delete
//                         </Button>
//                     }
//                     <Button variant="secondary" onClick={onCloseDetails}>
//                         Close
//                     </Button>
//                     <Button variant="primary" onClick={onSubmit} >
//                         Save & Close
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//             {/*  ============== EQUIPMENT CATEGORY DETAILS MODAL: END ============== */}
//         </div>
//     )

    return (
        <div></div>
    )

}

export default Backup;