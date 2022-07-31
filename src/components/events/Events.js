import React, {useEffect, useState, useMemo} from 'react';
import { getItems } from "../helpers/ComponentHelper";
import {Table} from "../layout/table/Table";
import ButtonAddSimple from "../layout/ButtonAddSimple";
import Footer from "../layout/Footer";

let clickedId = 0;

const Events = () => {

    const defaultItem = {
        "id": "",
        "propertyName": ""
    }

    const [loading, setLoading] = useState(true);
    const [itemsList, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(defaultItem);
    const [currentPage, setCurrentPage] = useState(1);
    const [backupItem, setBackupItem] = useState(defaultItem);

    const columns = [
        {label: "Id", accessor: "id", sortable: true},
        {label: "Language", accessor: "propertyName", sortable: true},
    ];

    //DO NOT DELETE!
    const getAllData = useMemo(() => {
        useEffect(() => {
            console.log(`current page ${currentPage}`);
            console.log(`set current page ${setCurrentPage}`);
            getItems(`http://localhost:8081/admin/language`, setItems)
                .then(() => setLoading(false))
                .catch(console.error);
        }, []);
    });

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
                                    <Table rows={itemsList} columns={columns} />
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