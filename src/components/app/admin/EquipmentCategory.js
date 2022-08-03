import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons/faEye";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import {compareObjects, resetInvalidInputField} from "../../../js/CommonHelper";
import {Table} from "react-bootstrap";
import ModalDeleteWarning from "../layout/ModalDeleteWarning";
import ModalFooter from "../layout/ModalFooter";
import {
    addItem,
    updateItem,
    deleteItem,
    getItems,
    getRelatedItemsByParentId
} from "../../../helpers/ComponentHelper";
import {clearCurrentItem} from "../../../helpers/ComponentHelper";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

import {
    onAddDataClick,
    onSaveAndClose,
    onFormCancelCloseButtonClick,
    onFormCancelDeleteButtonClick,
    onFormConfirmDeleteButtonClick,
    onItemsListInfoButtonClick,
    compareData,
    onFormCloseWithoutSavingButtonClick,
    restoreFormData,
    onItemsListDeleteButtonClick} from "../../../helpers/ComponentHelper";
import AppComponentCardHeader from "../common/AppComponentCardHeader";
import AppComponentLoadingDataDiv from "../common/AppComponentLoadingDataDiv";



const EquipmentCategory = () => {

    const equipmentCategoryUrl ="/equipment-category";
    const equipmentCategoryRelatedEquipmentUrl = "/equipment/category";

    const defaultItem = {
        "id": "",
        "name": "",
        "description": ""
    }

    const defaultFormState = {
        "showForm": false,
        "showDeleteWarning": false,
        "showItemChangedWarning": false,
        "formHeader": "Edit equipment category",
        "formDescription": "",
        "formDataChangedWarning": "Data has been changed",
        "formAddingDataMode": false,
        "formSaveButtonDisabled": false,
        "warningDescription":"",
        "warningDeleteButtonDisabled": false,
        "warningWarningIconVisible":false
    }
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const [loading, setLoading] = useState(true);
    const [allowDelete, setAllowDelete] = useState(null);
    const [currentFormState, setCurrentFormState] = useState(defaultFormState);
    const [itemsList, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(defaultItem);
    const [backupItem, setBackupItem] = useState(defaultItem);
    const [itemChanged, setItemChanged] = useState(false);
    // elements related to the item
    const [equipmentList, setEquipmentList] = useState([]);


    const onSaveItem = async (e) => {
        e.preventDefault();
        if(!currentItem.name) {
            let nameInput = document.getElementById("name");
            nameInput.classList.add("form-input-invalid");
            nameInput.placeholder = "Category name cannot be empty"
            return;
        }

        if (currentFormState.formAddingDataMode) {
            const item = {name: currentItem.name, description: currentItem.description};
            const response = await axiosPrivate.post(equipmentCategoryUrl, item);
            setItems([...itemsList, response.data]);
            onSaveAndClose(setCurrentFormState, currentFormState, setCurrentItem, setBackupItem, defaultItem);
        } else {
            const item = {id: currentItem.id, name: currentItem.name, description: currentItem.description};
            const response = await axiosPrivate.put(`${equipmentCategoryUrl}/${item.id}`, item);
            const data = await response.data;
            setItems(
              itemsList.map((i) =>
                i.id === item.id ? data : i));
            onSaveAndClose(setCurrentFormState, currentFormState, setCurrentItem, setBackupItem, defaultItem);
        }
    }


    // useEffect(() => {
    //     if (equipmentList.length !== 0) {
    //         setCurrentFormState({...currentFormState,
    //             warningDescription: "Cannot remove equipment category, because there is equipment related to it.",
    //             warningDeleteButtonDisabled: true,
    //             warningWarningIconVisible: true})
    //     } else {
    //         setCurrentFormState({...currentFormState,
    //             warningDescription: "Cannot remove equipment category, because there is equipment related to it.",
    //             warningDeleteButtonDisabled: false,
    //             warningWarningIconVisible: false})
    //     }
    //     onItemsListDeleteButtonClick(currentFormState, setCurrentFormState, "equipment category");
    // }, [equipmentList])

    const deleteItem = async (e) => {
        const url = `${equipmentCategoryUrl}/${currentItem.id}`;
        try {
            await axiosPrivate.delete(url);
            setItems(itemsList.filter((i) => i.id !== currentItem.id));
            onCloseDeleteWarningDialog();
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        if (allowDelete !== null) {
            onItemsListDeleteButtonClick(currentFormState, setCurrentFormState, "equipment category", allowDelete);
        }
    }, [allowDelete])


    const getRelatedEquipmentByCategoryId = async (id) => {
        try {
            const response = await axiosPrivate.get(`${equipmentCategoryRelatedEquipmentUrl}/${id}`);
            setEquipmentList(response.data);
            return response.data;
        } catch (err) {
            navigate('/login', { state: { from: location }, replace: true });
        }
    }

    const checkRelatedEquipment = async (id) => {
        const data = await getRelatedEquipmentByCategoryId(id);
        console.log(data);
        data.length === 0 ? setAllowDelete(true) : setAllowDelete(false);
    }

    const onCloseDeleteWarningDialog = () => {
        clearCurrentItem(setCurrentItem, setBackupItem, defaultItem);
        setAllowDelete(null);
        setCurrentFormState({...currentFormState,
            showDeleteWarning: false,
            showForm: false,
            warningDescription: "",
            warningDeleteButtonDisabled: false,
            warningWarningIconVisible: false});
    };

    const onCloseDetails = () => {
        if (compareObjects(backupItem, currentItem)) {
            setCurrentFormState({
                ...currentFormState,
                showForm: false,
                formSaveButtonDisabled: true,
                formAddingDataMode: false
            })
            clearCurrentItem(setCurrentItem, setBackupItem, defaultItem);
        } else {
            let closeWithoutSaving = document.getElementById("confirm-close");
            let btnClose = document.getElementById("btn-close");
            closeWithoutSaving.classList.add("div-visible");
            btnClose.classList.add("btn-invisible");
        }
    };

    useEffect(() => {
        compareData(currentFormState, setCurrentFormState, currentItem, backupItem)
    }, [itemChanged])


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getItems = async () => {
            try {
                const response = await axiosPrivate.get(equipmentCategoryUrl, {
                    signal: controller.signal
                });
                isMounted && setItems(response.data);
                setLoading(false);
            } catch (err) {
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getItems();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])


    return (
        <div id="layoutSidenav_content">
            <div className="container-fluid px-4">
                <h1 className="mt-4">EQUIPMENT CATEGORIES</h1>
                <div className="container-fluid">
                    <div className="RAM_container">
                        <Button className="RAM_button" id="addData"
                                onClick={()=>{
                                    clearCurrentItem(setCurrentItem, setBackupItem, defaultItem);
                                    onAddDataClick(currentFormState, setCurrentFormState, 'Here you can add new equipment categories.', 'Add new equipment category');
                                }}>
                            Add new equipment category</Button>
                    </div>
                </div>
                <div className="card mb-4">
                  <AppComponentCardHeader title = "Equipment categories list" />
                    {(() => {
                        if (loading) {
                            return (
                              <AppComponentLoadingDataDiv />
                            )
                        } else {
                            if (itemsList.length > 0) {
                                return (
                                    <div className="card-body">
                                        <Table id="datatablesSimple">
                                            <thead>
                                            <tr>
                                                <th>id</th>
                                                <th>name</th>
                                                <th>description</th>
                                                <th>details</th>
                                                <th>delete</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {itemsList.map((e) => (
                                                <tr key={e.id}>
                                                    <td>{e.id}</td>
                                                    <td>{e.name}</td>
                                                    <td>{e.description}</td>
                                                    <td><button className='btn btn-outline-info' onClick={() => {
                                                        getRelatedEquipmentByCategoryId(e.id)
                                                        setCurrentItem(e);
                                                        setBackupItem(e);
                                                        onItemsListInfoButtonClick(currentFormState, setCurrentFormState, "Edit equipment category");
                                                    }}><FontAwesomeIcon icon={faEye}/></button></td>
                                                    <td><button className='btn btn-outline-danger' onClick={() => {
                                                        setCurrentItem(e);
                                                        checkRelatedEquipment(e.id);
                                                        // onItemsListDeleteButtonClick(currentFormState, setCurrentFormState, "equipment category");
                                                    }}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                )
                            } else {
                                return (<h6>NO DATA FOUND, PLEASE ADD A NEW EQUIPMENT CATEGORY</h6>)
                            }
                        }
                    })()}
                </div>
            </div>
            {/*  ============== WARNING MODAL: BEGIN ============== */}
            <ModalDeleteWarning
                currentFormState={currentFormState}
                onCloseDeleteWarningDialog={onCloseDeleteWarningDialog}
                onDelete={deleteItem}
                deleteItemName="category"
            />
            {/*  ============== WARNING MODAL: END ============== */}

            {/*  ============== EQUIPMENT CATEGORY DETAILS MODAL: BEGIN ============== */}
            <Modal show={currentFormState.showForm}
                   size="xl"
                   backdrop="static"
                   keyboard={false}
                   onHide={onCloseDetails}>
                <Modal.Header className="form-header" closeButton closeVariant="white">
                    <Modal.Title>Equipment category details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section className="mb-4">
                        <h2 className="h1-responsive font-weight-bold text-center my-2">{ currentFormState.formHeader }</h2>
                        <p className="text-center w-responsive mx-auto mb-5 form_test">{ currentFormState.formDescription }</p>
                        <div>
                            <p className="text-center w-responsive mx-auto mb-5 data_changed" id="data-changed"><FontAwesomeIcon icon={faExclamationCircle}/>&nbsp;{ currentFormState.formDataChangedWarning }</p>
                            <Button variant="secondary" id="btn-restore" className="btn-restore" onClick={() => {
                                restoreFormData(backupItem, setCurrentItem, currentFormState, setCurrentFormState)}}>
                                Restore
                            </Button>
                        </div>

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
                                                        setItemChanged(!itemChanged);
                                                        setCurrentItem({...currentItem,
                                                            name: e.target.value});
                                                        setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
                                                    }}
                                                    onClick={() => {
                                                        resetInvalidInputField("name");
                                                    }}
                                                ></input>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="md-form mb-0">
                                                <label htmlFor="description"
                                                       className="">Description</label>
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    rows="3"
                                                    defaultValue={currentItem.description}
                                                    className="form-control md-textarea"
                                                    onChange={(e) => {
                                                        setItemChanged(!itemChanged);
                                                        setCurrentItem({...currentItem,
                                                            description: e.target.value});
                                                        setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
                                                    }}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    { !currentFormState.formAddingDataMode &&
                                        <div className="row margin-top">
                                            <div className="col-md-12">
                                                <div className="md-form mb-0">
                                                    <div className="card">
                                                        <div className="card-header">
                                                            {equipmentList.length > 0 ?
                                                                "Equipment in this category" :
                                                                "No equipment found in this category"
                                                            }
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    {equipmentList.map((e) => (
                                                                        <div key={e.id}>
                                                                            {e.name}
                                                                        </div>
                                                                    ))}
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
                <ModalFooter
                    onFormCancelDeleteButtonClick={onFormCancelDeleteButtonClick}
                    onDelete={deleteItem}
                    currentFormState={currentFormState}
                    onFormConfirmDeleteButtonClick={onFormConfirmDeleteButtonClick}
                    onFormCancelCloseButtonClick={onFormCancelCloseButtonClick}
                    onFormCloseWithoutSavingButtonClick={onFormCloseWithoutSavingButtonClick}
                    onCloseDetails={onCloseDetails}
                    onSubmit={onSaveItem}
                    setCurrentFormState = {setCurrentFormState}
                    setCurrentItem = {setCurrentItem}
                    setBackupItem = {setBackupItem}
                    defaultItem = {defaultItem}
                />
            </Modal>
            {/*  ============== EQUIPMENT CATEGORY DETAILS MODAL: END ============== */}
        </div>
    )

}

export default EquipmentCategory;