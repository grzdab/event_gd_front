import React, {useEffect, useState, useMemo} from 'react';
import { DJTable } from "../../table/DJTable";
import ButtonAddSimple from "./ButtonAddSimple";
import Footer from "./Footer";
import useCrud from "../../../hooks/useCrud";
import { useNavigate, useLocation } from "react-router-dom";

let clickedId = 0;

const Events = () => {

  const defaultItem = {
      "id": "",
      "propertyName": ""
  }
  const dataUrl = "/admin/language";
  const [loading, setLoading] = useState(true);
  const [itemsList, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(defaultItem);
  const [currentPage, setCurrentPage] = useState(1);
  const [backupItem, setBackupItem] = useState(defaultItem);
  const { isLoading, createItem, updateItem, deleteItem, getItems, getRelatedChildrenByParentId } = useCrud(dataUrl);
  const columns = [
      {label: "Id", accessor: "id", sortable: true},
      {label: "Language", accessor: "propertyName", sortable: true},
  ];
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const getData = async () => {
      const response = await getItems(dataUrl);
      if (response.status === 200) {
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


    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Events</h1>
                    <ol className="breadcrumb mb-4">

                        <li className="breadcrumb-item active">Events list</li>
                    </ol>
                    <div className="RAM_container">
                        <ButtonAddSimple
                            useStateModalDescription={'Here you can add new language details.'}
                            useStateModalHeader={'Add'}
                            backupItem={backupItem}
                            currentItem={currentItem}
                            url={`http://localhost:8081/admin/language`}
                            clickedId={clickedId}
                            itemsList={itemsList}
                            defaultItem={defaultItem}
                            setCurrentItem={setCurrentItem}
                            setBackupItem={setBackupItem}
                        />
                    </div>
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-table me-1"></i>
                            Language - Admin section
                        </div>
                        <div className="card-body">
                            {itemsList.length ?
                                (<div className="table_container">
                                    <DJTable rows={itemsList} columns={columns} />
                                </div>) : (<h5>Loading data</h5> )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
export default Events;