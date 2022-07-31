import React, {useEffect, useState, useMemo} from 'react';
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import ModalFooter from "../layout/ModalFooter";
import {compareObjects, resetInvalidInputField} from "../../js/CommonHelper";
import {
    clearCurrentItem, compareData,
    deleteItem, getItems, onAddDataClick,
    onFormCancelCloseButtonClick,
    onFormCancelDeleteButtonClick, onFormCloseWithoutSavingButtonClick,
    onFormConfirmDeleteButtonClick,
    onSaveAndClose, restoreFormData,
    updateItem
} from "../helpers/ComponentHelper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import TableContent from "../layout/TableContent";
// import PaginationEvent from "./PaginationEvent";
import axios from "axios";
import {Table} from "./Table";
import ButtonAddSimple from "./ButtonAddSimple";
// import Pagination from './Pagination';

let clickedId = 0;

const Events = () => {

    const defaultItem = {
        "id": "",
        "propertyName": ""
    }
    const defaultAddModalDetails = {
        "showForm": false,
        "showDeleteWarning": false,
        "showItemChangedWarning": false,
        "formDataChangedWarning": "Data has been changed",
        "formAddingDataMode": false,
        "formSaveButtonDisabled": false
    }
    const defaultEditModalDetails = {
        "showForm": false,
        "showDeleteWarning": false,
        "showItemChangedWarning": false,
        "formDataChangedWarning": "Data has been changed",
        "formAddingDataMode": false,
        "formSaveButtonDisabled": false
    }
    const [loading, setLoading] = useState(true);
    const [itemsList, setItems] = useState([]);
    const [showEditModalDetails, setShowEditModalDetails] = useState(defaultEditModalDetails);
    // const [modalHeader, setModalHeader] = useState('Edit equipment');
    // const [modalDescription, setModalDescription] = useState('');
    const [currentItem, setCurrentItem] = useState(defaultItem);
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddModalDetails, setShowAddModalDetails] = useState(defaultAddModalDetails);
    const [backupItem, setBackupItem] = useState(defaultItem);
    const [countItems, setCountItems] = useState(0);



    const columns = [
        {label: "Id", accessor: "id", sortable: true, sortbyOrder: "asc"},
        {label: "Language", accessor: "propertyName", sortable: true},
    ];

    const addItem = async (item, url, setItems, itemsList) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(item)
        });
        const data = await response.json();
        setItems([...itemsList, data]);
    }


    const onDelete = (e) => {
        e.preventDefault()
        deleteItem(currentItem.id, `http://localhost:8081/admin/language/${clickedId}`, setItems, itemsList)
            .then(() => {
                onCloseDeleteWarningDialog();
            });
    }
    const onCloseDeleteWarningDialog = () => {
        clearCurrentItem(setCurrentItem, setBackupItem, defaultItem);
        setShowAddModalDetails({...showAddModalDetails, showDeleteWarning: false, showForm: false});
    };

    const onCloseDetails = () => {
        if (compareObjects(backupItem, currentItem)) {
            setShowAddModalDetails({
                ...showAddModalDetails,
                showForm: false,
                formSaveButtonDisabled: true,
                formAddingDataMode: false
            })
            // } else {
            //     let closeWithoutSaving = document.getElementById("confirm-close");
            //     let btnClose = document.getElementById("btn-close");
            //     closeWithoutSaving.classList.add("div-visible");
            //     btnClose.classList.add("btn-invisible");
            // }
        }
    };

    // const onCloseEditDetails = () => {
    //     if (compareObjects(backupItem, currentItem)) {
    //         setShowEditModalDetails({
    //             ...showAddModalDetails,
    //             showForm: false,
    //             formSaveButtonDisabled: true,
    //             formAddingDataMode: false
    //         })
    //     } else {
    //         let closeWithoutSaving = document.getElementById("confirm-close");
    //         let btnClose = document.getElementById("btn-close");
    //         closeWithoutSaving.classList.add("div-visible");
    //         btnClose.classList.add("btn-invisible");
    //     }
    // };

    useEffect(() => {
        compareData(showAddModalDetails, setShowAddModalDetails, currentItem, backupItem)
    }, [currentItem])

    //DO NOT DELETE!
    const getAllData = useMemo(() => {
        useEffect(() => {
            console.log(`current page ${currentPage}`);
            console.log(`set current page ${setCurrentPage}`);
            getItems(`http://localhost:8081/admin/language`, setItems)
                .then(() => setLoading(false))
                .catch(console.error);
        }, []);
        console.log("itemList");
        console.log(itemsList);
    });

    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Events</h1>
                    <ol className="breadcrumb mb-4">

                        <li className="breadcrumb-item active">Events list</li>
                    </ol>
                    <div className="RAM_container">
                        <ButtonAddSimple
                            useStateModalDescription={'Here you can add new language details.'}
                            useStateModalHeader={'Add'}
                            backupItem={backupItem}
                            currentItem={currentItem}
                            url={`http://localhost:8081/admin/language`}
                            clickedId={clickedId}
                            itemsList={itemsList}
                            defaultItem={defaultItem}
                            setCurrentItem={setCurrentItem}
                            setBackupItem={setBackupItem}
                        />
                    </div>
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-table me-1"></i>
                            Language - Admin section
                        </div>
                        <div className="card-body">
                            {itemsList.length ?
                                (<div className="table_container">
                                    <Table rows={itemsList} columns={columns} />
                                </div>) : (<h5>Loading data</h5> )}
                        </div>
                    </div>
                </div>
            </main>
            <footer className="py-4 bg-light mt-auto">
                <div className="container-fluid px-4">
                    <div className="d-flex align-items-center justify-content-between small">
                        <div className="text-muted">Copyright &copy; R.A.M. 2022</div>
                        <div>
                            <a href="src/components/events/Events#">Privacy Policy</a>
                            &middot;
                            <a href="src/components/events/Events#">Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
export default Events;
