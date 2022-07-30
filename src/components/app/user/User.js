import React, {useEffect, useState, useRef} from 'react';
import '../../../css/Form.css';
import Button from "react-bootstrap/Button";
import {Modal, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  addItem,
  clearCurrentItem,
  compareData,
  deleteItem,
  getRelatedItemsByParentId,
  getItems,
  onAddDataClick, onFormCancelCloseButtonClick,
  onFormCancelDeleteButtonClick, onFormCloseWithoutSavingButtonClick,
  onFormConfirmDeleteButtonClick,
  onItemsListDeleteButtonClick,
  onItemsListInfoButtonClick,
  onSaveAndClose,
  restoreFormData,
  updateItem
} from "../../../helpers/ComponentHelper";
import {faEye} from "@fortawesome/free-solid-svg-icons/faEye";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import ModalDeleteWarning from "../layout/ModalDeleteWarning";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import AppComponentCardHeader from "../common/AppComponentCardHeader";
import AppComponentLoadingDataDiv from "../common/AppComponentLoadingDataDiv";
import AppComponentPageHeader from "../common/AppComponentPageHeader";


const User = () => {

  const defaultFormState = {
    "showForm": false,
    "showDeleteWarning": false,
    "showItemChangedWarning": false,
    "formHeader": "Edit user",
    "formDescription": "",
    "formDataChangedWarning": "Data has been changed",
    "formAddingDataMode": false,
    "formSaveButtonDisabled": false
  }

  const defaultItem = {
    id: 0,
    login: "",
    firstName: "",
    lastName: ""
  }


  const [loading, setLoading] = useState(true);
  const [allowDelete, setAllowDelete] = useState(true);
  const [currentFormState, setCurrentFormState] = useState(defaultFormState);
  const [itemsList, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(defaultItem);
  const [backupItem, setBackupItem] = useState(defaultItem);
  const [itemChanged, setItemChanged] = useState(false);

  const usersUrl ="/user-compact";
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getItems = async () => {
      try {
        const response = await axiosPrivate.get(usersUrl, {
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

  const onCloseDeleteWarningDialog = () => {
    clearCurrentItem(setCurrentItem, setBackupItem, defaultItem);
    setCurrentFormState({...currentFormState, showDeleteWarning: false, showForm: false});
  };

  const onDelete = async (e) => {
    e.preventDefault()
    const url = `${usersUrl}/${currentItem.id}`;
    try {
      await axiosPrivate.delete(url);
      setItems(itemsList.filter((i) => i.id !== currentItem.id));
      onCloseDeleteWarningDialog();
    } catch (err) {
      console.log(err.message);
    }
  }

  // const AppComponentPageHeaderProps = {
  //   title: "USERS",
  //   addDataButtonProps: {
  //     buttonTitle: "Add new USER!",
  //     clearItemProps: {
  //       setCurrentItem: setCurrentItem,
  //       setBackupItem: setBackupItem,
  //       defaultItem: defaultItem
  //     },
  //     onAddDataClickProps: {
  //       currentFormState: currentFormState,
  //       setCurrentFormState: setCurrentItem,
  //       formDescription: 'Here you can add new users.',
  //       formHeader: 'Add new user'
  //     }
  //   }
  // }


  return (
    <div id="layoutSidenav_content">
      <div className="container-fluid px-4">
        {/*<AppComponentPageHeader props ={ AppComponentPageHeaderProps } />*/}

        <h1 className="mt-4">USERS</h1>
        <div className="container-fluid">
          <div className="RAM_container">
            <Button className="RAM_button" id="addData"
                    onClick={()=>{
                      clearCurrentItem(setCurrentItem, setBackupItem, defaultItem);
                      onAddDataClick(currentFormState, setCurrentFormState, 'Here you can add new users.', 'Add new user');
                    }}>
              Add new user</Button>
          </div>
        </div>

        <div className="card mb-4">
          <AppComponentCardHeader title = "Users list" />
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
                        <th>login</th>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>details</th>
                        <th>delete</th>
                      </tr>
                      </thead>
                      <tbody>
                      {itemsList.map((e) => (
                        <tr key={e.id}>
                          <td>{e.login}</td>
                          <td>{e.firstName}</td>
                          <td>{e.lastName}</td>
                          <td><button className='btn btn-outline-info' onClick={() => {
                            setCurrentItem(e);
                            setBackupItem(e);
                            onItemsListInfoButtonClick(currentFormState, setCurrentFormState, "Edit user data");
                          }}><FontAwesomeIcon icon={faEye}/></button></td>
                          <td><button className='btn btn-outline-danger' onClick={() => {
                            setCurrentItem(e);
                            setAllowDelete(true);
                            onItemsListDeleteButtonClick(currentFormState, setCurrentFormState, "user", allowDelete);
                          }}><FontAwesomeIcon icon={faTrashAlt}/></button></td>
                        </tr>
                      ))}
                      </tbody>
                    </Table>
                  </div>
                )
              } else {
                return (<h6>NO DATA FOUND, PLEASE ADD A NEW USER</h6>)
              }
            }
          })()}
        </div>
      </div>
      {/*  ============== WARNING MODAL: BEGIN ============== */}
      <ModalDeleteWarning
        currentFormState={currentFormState}
        onCloseDeleteWarningDialog={onCloseDeleteWarningDialog}
        onDelete={onDelete}
        deleteItemName="user"
      />
    </div>
  )




};

export default User;
