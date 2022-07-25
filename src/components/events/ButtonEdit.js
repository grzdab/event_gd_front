import React, {useState} from 'react';
import {Fab} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ModalEdit from './ModalEdit';

let clickedId = 0;


export const clearCurrentItem = (setCurrentItem, setBackupItem, defaultItem) => {
    setCurrentItem(defaultItem);
    setBackupItem(defaultItem);
}

export const onAddDataClick = (currentFormState, setCurrentFormState, formDescription, formHeader) => {
    setCurrentFormState({...currentFormState,
        formDescription: formDescription,
        formHeader: formHeader,
        formAddingDataMode: true,
        formSaveButtonDisabled: false,
        showForm: true})
}
const ButtonEdit =({e}) => {
    const defaultItem = {
        "id": "",
        "propertyName": ""
    }
    const defaultEditModalDetails = {
        "showForm": false,
        "showDeleteWarning": false,
        "showItemChangedWarning": false,
        "formDataChangedWarning": "Data has been changed",
        "formAddingDataMode": false,
        "formSaveButtonDisabled": false
    }
    const [modalHeader, setModalHeader] = useState('Edit equipment');
    const [modalDescription, setModalDescription] = useState('');
    const [languageName, setLanguageName] = useState('');
    const [currentItem, setCurrentItem] = useState(defaultItem);
    const [backupItem, setBackupItem] = useState(defaultItem);
    const [showEditModalDetails, setShowEditModalDetails] = useState(defaultEditModalDetails);

    function saveId(id) {
        console.log("id");
        console.log(id);
        clickedId = id;
    }

    return(
        <div>
            <Fab
                    variant='extended'
                    size="small"
                    color="inherit"
                    aria-label="edit">
                    <EditIcon
                        onClick={()=>{
                            setModalDescription('Here you can edit language details.');
                            setModalHeader('Edit');
                            // setShowEditModalDetails(true);
                            clearCurrentItem(setCurrentItem,
                                setBackupItem, defaultItem);
                            onAddDataClick(showEditModalDetails,
                                setShowEditModalDetails,
                                'Here you can edit language.', 'Edit language');
                            saveId(e.id);
                            setLanguageName(e.propertyName);
                        }}
                    />
            </Fab>

            {/*  ============== EQUIPMENT EDIT DETAILS MODAL: BEGIN ============== */}
            <ModalEdit />
            {/*  ============== EQUIPMENT EDIT DETAILS MODAL: END ============== */}
        </div>
        )
};

export default ButtonEdit;

