import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import SchedulerHeader from "./SchedulerHeader";
import SchedulerRows from "./SchedulerRows";

import LoadingDataDiv from "../common/LoadingDataDiv";
import useCrud from "../../../hooks/useCrud";

const Scheduler = () => {

  const equipmentDataUrl = "/equipment";
  const { getItems } = useCrud(equipmentDataUrl);

  const [itemsList, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const getData = async () => {
      const response = await getItems(equipmentDataUrl);
      if (response.status >= 200 && response.status < 400) {
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


  let dataSectionContent;
  if (loading) {
    dataSectionContent = <LoadingDataDiv />
  } else if (itemsList.length > 0) {
    dataSectionContent =
      <SchedulerRows itemsList = { itemsList }/>
  } else {
    dataSectionContent = <h6>NO DATA FOUND, THE LIST OF EQUIPMENT IS EMPTY</h6>
  }


  return (
    <div id="layoutSidenav_content">
      <div className="container-fluid px-4">
        <h1 className="mt-4">SCHEDULER</h1>
        <h3 className="mt-4">August 2022</h3>
        <div className="card mb-4 shadow mb-5 bg-white rounded">
          <SchedulerHeader title = 'AUGUST 2022' />
          { dataSectionContent }
        </div>
      </div>
    </div>
  )

}

export default Scheduler;