import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons/faExclamationCircle";
import ModalFooter from "../../common/ModalFooter";
import { useNavigate, useLocation } from "react-router-dom";
import { defaultFormState } from "../../../../defaults/Forms";
import { userCompactedDefault, userDefault } from "../../../../defaults/Items";
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
import UserContactCard from "./UserContactCard";
import UserRolesCard from "./UserRolesCard";

const Users = () => {

  const dataUrl = "/user-compact";
  const dataFullUrl = "/user";
  const userClientsUrl = "/equipment/category"
  const appRolesUrl = "/admin/role"
  const userClientRepresentativesUrl = ""
  const userEventsUrl = "";
  const defaultItem = userCompactedDefault;
  const defaultFullItem = userDefault;
  const itemName = "user";
  const itemNames = "users";

  const navigate = useNavigate();
  const location = useLocation();
  const { createItem, updateItem, deleteItem, getItems, getRelatedChildrenByParentId } = useCrud(dataUrl);

  const [loading, setLoading] = useState(true);
  const [allowDelete, setAllowDelete] = useState(null);
  const [currentFormState, setCurrentFormState] = useState(defaultFormState);
  const [itemsList, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(defaultFullItem);
  const [backupItem, setBackupItem] = useState(defaultItem);
  const [itemChanged, setItemChanged] = useState(false);
  const [appRoles, setAppRoles] = useState([]);
  // elements related to the item
  const [userClientsList, setUserClientsList] = useState([]);
  const columns = [
    {label: "Id", accessor: "id", sortable: true, searchable: false, visible: false},
    {label: "Login", accessor: "login", sortable: true, searchable: true},
    {label: "First name", accessor: "firstName", sortable: true, searchable: true},
    {label: "Last name", accessor: "lastName", sortable: true, searchable: true},
    {label: "details", accessor: "editBtn", sortable: false, searchable: false},
    {label: "delete", accessor: "deleteBtn", sortable: false, searchable: false},
  ];

  const state = {
    itemsList, setItems,
    currentItem, setCurrentItem,
    currentFormState, setCurrentFormState,
    defaultItem, backupItem, setBackupItem, itemChanged, setItemChanged,
    setAllowDelete,
    setRelatedItems: setUserClientsList
  }

  const onDelete = async () => {
    const response = await deleteItem(`${ dataUrl }/${ currentItem.id }`, currentItem.id, state);
    if (response === 401 || response === 403) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }

  const onSaveItemClick = async (e) => {
    e.preventDefault();
    if(!currentItem.login) {
      let nameInput = document.getElementById("login");
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
    const data = await getRelatedChildrenByParentId(`${ userClientsUrl }/${ id }`, id, setUserClientsList);
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
      const [itemsData, appRoles] =
        await Promise.all([
          getItems(dataUrl),
          getItems(appRolesUrl),
        ]);

      const success =
        itemsData.status === 200 &&
        appRoles.status === 200;

      if (success) {
        setLoading(false);
        setItems(itemsData.data);
        setAppRoles(appRoles.data);
      } else {
        navigate('/login', { state: { from: location }, replace: true})
      }
    };

    // const getData = async () => {
    //   const response = await getItems(dataUrl);
    //   if (response.status === 200) {
    //     setLoading(false);
    //     setItems(response.data);
    //   } else if (response.status === 401 || response.status === 403) {
    //     navigate('/login', { state: { from: location }, replace: true})
    //   } else {
    //     alert("Could not get the requested data.");
    //   }
    // };
    getData();
  }, [])


  const getCompleteItem = async (id) => {
    const response = await getItems(`${dataFullUrl}/${id}`);
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 401 || response.status === 403) {
      navigate('/login', { state: { from: location }, replace: true})
    } else {
      alert("Could not get the requested data.");
    }
  }


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
        relatedItemsUrl = { userClientsUrl }
        getCompleteItem = { getCompleteItem }
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
                    <div className="col-md-6">
                      <div className="md-form mb-0">
                        <label htmlFor="login" className="">Login</label>
                        <TextInput propertyName="login" required="true" state={ state }/>
                      </div>
                    </div>
                    <div className="col-md-6 mt-auto d-flex flex-row-reverse">
                      <div className="md-form mb-0">
                        <Button>Change password</Button>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="md-form mb-0">
                        <label htmlFor="firstName" className="">First name</label>
                        <TextInput propertyName="firstName" required="true" state={ state }/>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="md-form mb-0">
                        <label htmlFor="lastName" className="">Last name</label>
                        <TextInput propertyName="lastName" required="true" state={ state }/>
                      </div>
                    </div>
                  </div>
                  <div className="row margin-top">
                    <div className="col-md-6">
                      <UserContactCard state = { state }/>
                    </div>
                    <div className="col-md-6">
                      <UserRolesCard state = { state } appRoles = { appRoles }/>
                    </div>
                  </div>
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

export default Users;