import React from 'react';
import Button from "react-bootstrap/Button";
import {clearCurrentItem, onAddDataClick} from "../../../helpers/ComponentHelper";
import {useEffect} from "react";

const AppButtonAddData = ( {props} ) => {

  useEffect(() => {
    console.log(props);
  }, [])

  return (
    <>
      <Button className="RAM_button" id="addData"
              onClick={()=>{
                clearCurrentItem(
                  props.clearItemProps.currentItem,
                  props.clearItemProps.setCurrentItem,
                  props.clearItemProps.setBackupItem,
                  props.clearItemProps.defaultItem);
                onAddDataClick(
                  props.onAddDataClickProps.currentFormState,
                  props.onAddDataClickProps.setCurrentFormState,
                  props.onAddDataClickProps.formDescription,
                  props.onAddDataClickProps.formHeader);
              }}>
        { props.buttonTitle } </Button>
    </>
  );
};

export default AppButtonAddData;
