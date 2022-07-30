import React, {useEffect} from 'react';

const AppComponentCardHeader = ({ title }) => {

  return (
    <div className="card-header">
      <i className="fas fa-table me-1"></i>
      { title }
    </div>
  );
};

export default AppComponentCardHeader;
