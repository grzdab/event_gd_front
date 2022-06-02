import React, {Component} from 'react';
import { useState, useEffect } from 'react';

const Clients = () => {

    const [clientsList, setClients] = useState([]);

    useEffect(() => {
        const getClients = async() => {
            const data = await fetchClients();
            setClients(data);
        }
        getClients();
    }, []);

    const fetchClients = async () => {
        const response = await fetch('http://localhost:5111/Clients');
        const data = await response.json();
        return data;
    }

    // hardcoded version
    const [hardClientsList, setHardClients] = useState([
        {  "id": "50ae8c6-b21a-6ac3-6e01-1ed27d4eb3bca",
            "fullName": "Company 50ae8c6-b21a",
            "shortName": "Company 50ae8c",
            "telephone": 183322079,
            "email": "50ae8c6@domain.com" },
        {  "id": "bee7b63-a252-b3cd-8c5c-be32dd4e4063e",
            "fullName": "Company bee7b63-a252",
            "shortName": "Company bee7b6",
            "telephone": 417559943,
            "email": "bee7b63@domain.com" },
        {  "id": "ca214d3-2cbd-ca2e-6ac5-eae82e0b4c05c",
            "fullName": "Company ca214d3-2cbd",
            "shortName": "Company ca214d",
            "telephone": 621230897,
            "email": "ca214d3@domain.com" },
        {  "id": "e7daa8b-2b6d-bdb4-1d0e-c4d4d5b3b66a0",
            "fullName": "Company e7daa8b-2b6d",
            "shortName": "Company e7daa8",
            "telephone": 772499904,
            "email": "e7daa8b@domain.com" },
        {  "id": "bbba04a-16ec-abcd-d4c3-8c01a35c3b74d",
            "fullName": "Company bbba04a-16ec",
            "shortName": "Company bbba04",
            "telephone": 955469892,
            "email": "bbba04a@domain.com" },
        {  "id": "b7c37ca-b2bb-2156-d025-7c01e2adda767",
            "fullName": "Company b7c37ca-b2bb",
            "shortName": "Company b7c37c",
            "telephone": 483346102,
            "email": "b7c37ca@domain.com" },
        {  "id": "76becc5-e0a4-85c6-8335-bce7cc1ad5d05",
            "fullName": "Company 76becc5-e0a4",
            "shortName": "Company 76becc",
            "telephone": 895056896,
            "email": "76becc5@domain.com" },
        {  "id": "318b448-1bb0-be50-1616-ceab6373ca0e2",
            "fullName": "Company 318b448-1bb0",
            "shortName": "Company 318b44",
            "telephone": 440443354,
            "email": "318b448@domain.com" },
        {  "id": "a38c87b-cb5c-d10e-3c71-ee5e0a54cd6c0",
            "fullName": "Company a38c87b-cb5c",
            "shortName": "Company a38c87",
            "telephone": 412807915,
            "email": "a38c87b@domain.com" },
        {  "id": "35380d7-e4ee-cdad-ed6a-4e8e70cee728b",
            "fullName": "Company 35380d7-e4ee",
            "shortName": "Company 35380d",
            "telephone": 252396916,
            "email": "35380d7@domain.com" }

    ]);

    const fetchById = async (id) => {
        const response = await fetch(`http://localhost:5111/Clients/${id}`);
        const data = await response.json();
        return data;
    }

    const addClients = async (Clients) => {
        const response = await fetch('http://localhost:5111/Clients', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(Clients)
        });

        const data = await response.json();
        setClients([...clientsList, data]);
    }

    const deleteClients = async (id) => {
        await fetch(`http://localhost:5111/Clients/${id}`, {method: 'DELETE',});
        setClients(clientsList.filter((Clients) => Clients.id !== id));
    }

    const toggleInUse = async (id) => {
        const Clients = await fetchById(id);
        const updated = {...Clients, inUse: !Clients.inUse};
        const response = await fetch(`http://localhost:5555/Clients/${id}`, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updated)
        })

        const data = await response.json();
        setClients(
            clientsList.map((Clients) =>
                Clients.id === id ? {...Clients, inUse: data.inUse} : Clients));
    }

    console.log("ClientsList");
    console.log(clientsList);
    console.log("hardClientsList");
    console.log(hardClientsList);

    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Clients</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item active">Clients list</li>
                    </ol>
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-table me-1"></i>
                            DataTable Example
                        </div>
                        <div className="card-body">
                            <table id="datatablesSimple">
                                <thead>
                                <tr>
                                    <th>Full name</th>
                                    <th>Short name</th>
                                    <th>Telephone</th>
                                    <th>Email</th>
                                    <th>Details</th>
                                </tr>
                                </thead>
                                <tbody>
                                {hardClientsList.map((e) => (
                                    <tr key={e.id}>
                                        <td>{e.fullName}</td>
                                        <td>{e.shortName}</td>
                                        <td>{e.telephone}</td>
                                        <td>{e.email}</td>
                                        <td><button className = "btn btn-info" onClick={() => alert("Eq:" + e.name)}>View details</button></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="py-4 bg-light mt-auto">
                <div className="container-fluid px-4">
                    <div className="d-flex align-items-center justify-content-between small">
                        <div className="text-muted">Copyright &copy; R.A.M. 2022</div>
                        <div>
                            <a href="#">Privacy Policy</a>
                            &middot;
                            <a href="#">Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );

}

export default Clients;
