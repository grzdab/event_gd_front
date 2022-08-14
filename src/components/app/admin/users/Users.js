import React, { useEffect, useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faInfoCircle, faEye } from "@fortawesome/free-solid-svg-icons";
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
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // requires 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special char and has to be 8-24 chars long

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
  const axiosPrivate = useAxiosPrivate();

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
  const [validPassword, setValidPassword] = useState(true);
  const [pwd, setPwd] = useState('');
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
  const passwordRef = useRef();

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

  const validatePassword = (newPassword) => {

    if (newPassword && !PWD_REGEX.test(newPassword)) {
      setValidPassword(false);
      console.log("Password has to consist of" +
        " 8 to 24 characters. " +
        " Must include uppercase and lowercase letters, a number and a special character.)");
      return false;
    }

    return true;
  }


  const onSaveItemClick = async (e) => {
    e.preventDefault();
    if(!currentItem.login) {
      let nameInput = document.getElementById("login");
      nameInput.classList.add("form-input-invalid");
      nameInput.placeholder = `${itemName} name cannot be empty`;
      return;
    }

    const newPassword = document.getElementById("password");

    if (!validatePassword(newPassword.value)) return;

    let response;
    let password;
    if (!currentFormState.formAddingDataMode) {
      password = newPassword.value ? newPassword.value : currentItem.password;
    }

    const item = {
      id: currentItem.id,
      login: currentItem.login,
      password: password,
      firstName: currentItem.firstName,
      lastName: currentItem.lastName,
      contact: {
        id: currentItem.contact.id,
        email: currentItem.contact.email,
        phone: currentItem.contact.phone
      },
      userRoles: currentItem.userRoles
    }

    if (currentFormState.formAddingDataMode) {
      response = await createItem(dataFullUrl, item, state);
    } else {
      response = await updateItem(`${ dataFullUrl }/${ item.id }`, item, state);
    }
    if (response === 401 || response === 403) navigate('/login', { state: { from: location }, replace: true });
    response && onSaveAndClose({state});
  }

  const checkRelatedItems = async (id) => {
    const data = await getRelatedChildrenByParentId(`${ userClientsUrl }/${ id }`, id, setUserClientsList);
    data.length === 0 ? setAllowDelete(true) : setAllowDelete(false);
  }

  const onClose = () => {
    setPwd('');
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


  const passwordToggler = () => {
    const password = document.getElementById("password");
    const toggler = document.getElementById("password_toggler");
    if (password.type === "password") {
      password.type = "text";
      toggler.classList.add("pwd_visible");
    } else {
      password.type = "password";
      toggler.classList.remove("pwd_visible")
    }
  }

  useEffect(() => {
    if (currentItem === backupItem) {
      console.log("THE SAME")
      setPwd('');
    }
  }, [currentItem])


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

    getData();
  }, [])


  useEffect(() => {
    if (pwd !== '') {
      setValidPassword(PWD_REGEX.test(pwd))
    } else {
      setValidPassword(true);
    }
  }, [pwd])


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

  const onPasswordChange = (e) => {
    setItemChanged(!itemChanged);
    setCurrentItem(currentItem => ({...currentItem,
      password: e.target.value === "" ? backupItem.password : e.target.value}));
    setCurrentFormState({...currentFormState, formSaveButtonDisabled: false});
    setPwd(e.target.value);
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
                    <div className="col-md-4">
                      <div className="md-form mb-0">
                        <label htmlFor="login" className="">Login</label>
                        <TextInput propertyName="login" required="true" state={ state }/>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="md-form mb-0">
                        <label htmlFor="firstName" className="">First name</label>
                        <TextInput propertyName="firstName" required="true" state={ state }/>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="md-form mb-0">
                        <label htmlFor="lastName" className="">Last name</label>
                        <TextInput propertyName="lastName" required="true" state={ state }/>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-8 mt-3">
                      <div className="md-form mb-0">
                        Please provide a new password only if you want to change your password
                      </div>
                    </div>
                    <div className="col-md-4 mt-3">
                      <div className="md-form mb-0">
                        <label  htmlFor="password" className="">New password</label>
                        <div style={{position: "relative"}}>
                        <input
                          className="form-control"
                          type="password"
                          id="password"
                          onChange={(e) => onPasswordChange(e)}
                          defaultValue={pwd}
                          required
                          ref={passwordRef}
                        />
                          <span id="password_toggler" className="password_toggler" onClick={()=>passwordToggler()}><FontAwesomeIcon icon={faEye}></FontAwesomeIcon></span>
                      </div>
                        <p id="pwdnote" className={!validPassword ? "pwd_info" : "offscreen"}>
                          <FontAwesomeIcon icon={faInfoCircle} />&nbsp;
                          8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character.
                          Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
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