import React, {useEffect} from 'react';
import AppButtonAddData from "./AppButtonAddData";


const AppComponentPageHeader = ( { props } ) => {

  return (
    <>
    <h1 className="mt-4">{ props.title }</h1>
    <div className="container-fluid">
      <div className="RAM_container">
        <AppButtonAddData props ={ props.addDataButtonProps }  />
      </div>
    </div>
    </>
  );
};

export default AppComponentPageHeader;
