import React from 'react';

const AppComponentCardHeader = ({ title }) => {

  return (
    <div className="card-header" style={{backgroundColor: "#26313E", color: "white"}}>
      <i className="fas fa-table me-1"></i>
      { title }
    </div>
  );
};

export default AppComponentCardHeader;
