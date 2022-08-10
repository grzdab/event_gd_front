import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import ModalFooter from "../../common/ModalFooter";
import { useNavigate, useLocation } from "react-router-dom";
import { defaultFormState } from "../../../../defaults/Forms";
import {
    clientTypeDefault
} from "../../../../defaults/Items";
import {
    onSaveAndClose,
    compareData,
    restoreFormData,
    onItemsListDeleteButtonClick,
    onCloseDetails
} from "../../../../helpers/ComponentHelper";

import AppComponentCardHeader from "../../common/AppComponentCardHeader";
import LoadingDataDiv from "../../common/LoadingDataDiv";
import AppAddDataButton from "../../common/AppAddDataButton";
import DeleteWarningModal from "../../common/DeleteWarningModal";
import ItemDetailsModalHeader from "../../common/ItemDetailsModalHeader";
import TextInput from "../../../elements/TextInput";
import TextArea from "../../../elements/TextArea";
import RelatedItemsList from "../../common/RelatedItemsList";
import useCrud from "../../../../hooks/useCrud";
import { Table } from "../../../table/Table";

const ClientType = () => {

    const dataUrl ="/admin/clientType";
    //od Justyny
    const relatedItemsUrl = "/client/clientType"; // if no need to check it, initialize with null and remove RelatedItemsList from details modal
    const defaultItem = clientTypeDefault;
    const itemName = "client type";
    const itemNames = "client types";

    const navigate = useNavigate();
    const location = useLocation();
    const { createItem, updateItem, deleteItem, getItems, getRelatedChildrenByParentId } = useCrud(dataUrl);

    const [loading, setLoading] = useState(true);
    const [allowDelete, setAllowDelete] = useState(null);
    const [currentFormState, setCurrentFormState] = useState(defaultFormState);
    const [itemsList, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(defaultItem);
    const [backupItem, setBackupItem] = useState(defaultItem);
    const [itemChanged, setItemChanged] = useState(false);
    // elements related to the item
    const [equipmentList, setEquipmentList] = useState([]);
    const columns = [
        {label: "Id", accessor: "id", sortable: true, searchable: false, visible: false},
        {label: "Name", accessor: "name", sortable: true, searchable: true},
        {label: "details", accessor: "editBtn", sortable: false, searchable: false},
        {label: "delete", accessor: "deleteBtn", sortable: false, searchable: false},
    ];

    const state = {
        itemsList, setItems,
        currentItem, setCurrentItem,
        currentFormState, setCurrentFormState,
        defaultItem, backupItem, setBackupItem, itemChanged, setItemChanged,
        setAllowDelete,
        setRelatedItems: setEquipmentList
    }

    const onDelete = async () => {
        const response = await deleteItem(`${ dataUrl }/${ currentItem.id }`, currentItem.id, state);
        if (response === 401 || response === 403) {
            navigate('/login', { state: { from: location }, replace: true });
        }
    }

    const onSaveItemClick = async (e) => {
        e.preventDefault();
        if(!currentItem.name) {
            let nameInput = document.getElementById("name");
            nameInput.classList.add("form-input-invalid");
            nameInput.placeholder = `${itemName} name cannot be empty`;
            return;
        }
        let response;
        const item = { id: currentItem.id, name: currentItem.name };
        if (currentFormState.formAddingDataMode) {
            response = await createItem(dataUrl, item, state);
        } else {
            response = await updateItem(`${ dataUrl }/${ item.id }`, item, state);
        }
        if (response === 401 || response === 403) navigate('/login', { state: { from: location }, replace: true });
        response && onSaveAndClose({state});
    }

    const checkRelatedItems = async (id) => {
        const data = await getRelatedChildrenByParentId(`${ relatedItemsUrl }/${ id }`, id, setEquipmentList);
        data.length === 0 ? setAllowDelete(true) : setAllowDelete(false);
    }

    const onClose = () => {
        onCloseDetails({ state })
    };

    useEffect(() => {
        compareData(currentFormState, setCurrentFormState, currentItem, backupItem);
    }, [itemChanged])

    useEffect(() => {
        if (allowDelete !== null) {
            onItemsListDeleteButtonClick(currentFormState, setCurrentFormState, itemName, allowDelete);
        }
    }, [allowDelete])

    useEffect(() => {
        const getData = async () => {
            const response = await getItems(dataUrl);
            if (response.status === 200) {
                setLoading(false);
                setItems(response.data);
            } else if (response.status === 401 || response.status === 403) {
                navigate('/login', { state: { from: location }, replace: true})
            } else {
                alert("Could not get the requested data.");
            }
        };
        getData();
    }, [])


    const addDataButtonProps = {
        setCurrentItem,
        setBackupItem,
        defaultItem,
        currentFormState,
        setCurrentFormState,
        formDescription: `Here you can add new ${ itemName }.`,
        formHeader: `Add new ${ itemName }`,
        buttonTitle: `Add new ${ itemName }`
    }


    let dataSectionContent;
    if (loading) {
        dataSectionContent = <LoadingDataDiv />
    } else if (itemsList.length > 0) {
        dataSectionContent =
            <Table
                rows = { itemsList }
                columns = { columns }
                state = { state }
                checkRelatedItems = { checkRelatedItems }
                formHeader = {`Edit ${ itemName }`}
                relatedItemsUrl = { relatedItemsUrl }
            />
    } else {
        dataSectionContent = <h6>NO DATA FOUND, PLEASE ADD A NEW `${itemName.toUpperCase()}`</h6>
    }

    return (
        <div id="layoutSidenav_content">
            <div className="container-fluid px-4">
                <h1 className="mt-4">{itemNames.toUpperCase()}</h1>
                <AppAddDataButton props ={ addDataButtonProps }/>
                <div className="card mb-4 shadow mb-5 bg-white rounded">
                    <AppComponentCardHeader title ={`${itemNames} list`} />
                    { dataSectionContent }
                </div>
            </div>

            <DeleteWarningModal
                state = { state }
                onDelete = { onDelete }
                deleteItemName ={ itemName } />

            <Modal show={ currentFormState.showForm }
                   size="xl"
                   backdrop="static"
                   keyboard={ false }
                   onHide={ onClose }>
                <ItemDetailsModalHeader title ={ currentFormState.formHeader } />
                <Modal.Body>
                    <section className="mb-4">
                        <p className="text-center w-responsive mx-auto mb-1 form_test">{ currentFormState.formDescription }</p>
                        <div>
                            <p className="text-center w-responsive mx-auto mb-1 data_changed" id="data-changed"><FontAwesomeIcon icon={ faExclamationCircle }/>&nbsp;{ currentFormState.formDataChangedWarning }</p>
                            <Button variant="secondary" id="btn-restore" className="btn-restore" onClick={ () => {
                                restoreFormData({ state })}}>
                                Cancel all changes
                            </Button>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-md-0 mb-5">
                                <form id="add-item-form" name="add-item-form">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="md-form mb-0">
                                                <label htmlFor="name" className="">Name</label>
                                                <TextInput propertyName="name" required="true" state={ state }/>
                                            </div>
                                        </div>
                                        {/*<div className="col-md-12">*/}
                                        {/*    <div className="md-form mb-0">*/}
                                        {/*        <label htmlFor="description" className="">Description</label>*/}
                                        {/*        <TextArea propertyName="description" required="false" rows = "2" state = { state }/>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                    </div>
                                    { !currentFormState.formAddingDataMode &&
                                        <RelatedItemsList
                                            itemsList = { equipmentList }
                                            itemProperties ={["name"]}
                                            titleWhenPopulated ={`Items using this ${ itemName }`}
                                            titleWhenEmpty = "No usages found"/>
                                    }
                                </form>
                            </div>
                        </div>
                    </section>
                </Modal.Body>

                <ModalFooter
                    onDelete = { onDelete }
                    onCloseDetails = { onClose }
                    onSubmit = { onSaveItemClick }
                    state = { state }
                />

            </Modal>
        </div>
    )

}

export default ClientType;