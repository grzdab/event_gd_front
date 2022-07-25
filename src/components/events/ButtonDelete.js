import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

let clickedId = 0;


function saveId(id) {
    console.log("id");
    console.log(id);
    clickedId = id;
}
const ButtonDelete = ({
                         e
                        }) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);


        return (
            <Button variant="danger" id="delete-image"
                    onClick={() => {
                        setShowDeleteModal(true);
                        saveId(e.id);
                    }}>
                <FontAwesomeIcon icon={faTrashAlt}/>
            </Button>
        )
    };

export default ButtonDelete;