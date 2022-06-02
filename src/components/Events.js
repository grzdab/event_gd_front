import React, {Component} from 'react';
import { useState, useEffect } from 'react';

const Events = () => {

    const [eventsList, setEvents] = useState([]);

    useEffect(() => {
        const getEvents = async() => {
            const data = await fetchEvents();
            setEvents(data);
        }
        getEvents();
    }, []);

    const fetchEvents = async () => {
        const response = await fetch('http://localhost:5111/Events');
        const data = await response.json();
        return data;
    }

    // hardcoded version
    const [hardEventsList, setHardEvents] = useState([
        {  "id": "7edba63-663d-b53d-d2dd-6ecbcb270dc4c",
            "client": "Company 7edba63-663d",
            "date": "27-10-2022",
            "location": "Warsaw",
            "supervisor": "Salesperson bcb270dc4c" },
        {  "id": "ee16235-cecd-741c-c224-ad4ec3e31acee",
            "client": "Company ee16235-cecd",
            "date": "14-4-2022",
            "location": "Cracow",
            "supervisor": "Salesperson ec3e31acee" },
        {  "id": "2ea20da-dbc4-cec1-c6e0-db0e6cd1dd32d",
            "client": "Company 2ea20da-dbc4",
            "date": "7-1-2022",
            "location": "Madrid",
            "supervisor": "Salesperson e6cd1dd32d" },
        {  "id": "c361e6a-26a5-edee-1aa3-0edb5eeb612e1",
            "client": "Company c361e6a-26a5",
            "date": "26-3-2022",
            "location": "New York",
            "supervisor": "Salesperson b5eeb612e1" },
        {  "id": "422e08e-c7bb-eb3e-cced-18c731e06c38c",
            "client": "Company 422e08e-c7bb",
            "date": "21-6-2022",
            "location": "Paris",
            "supervisor": "Salesperson 731e06c38c" },
        {  "id": "d004c3d-7d1d-78bc-81dc-bd6321e66aa6a",
            "client": "Company d004c3d-7d1d",
            "date": "16-10-2022",
            "location": "London",
            "supervisor": "Salesperson 321e66aa6a" },
        {  "id": "4eb2e4c-b4b2-07de-d4d7-71dbc2b52ac20",
            "client": "Company 4eb2e4c-b4b2",
            "date": "19-8-2022",
            "location": "Berlin",
            "supervisor": "Salesperson bc2b52ac20" },
        {  "id": "8834ac0-bc7a-7bab-8de0-e6d8b78735ead",
            "client": "Company 8834ac0-bc7a",
            "date": "10-12-2022",
            "location": "Oslo",
            "supervisor": "Salesperson 8b78735ead" },
        {  "id": "2db35b2-ea7b-3d6a-e782-ddd3e0463a5c1",
            "client": "Company 2db35b2-ea7b",
            "date": "8-1-2022",
            "location": "Rome",
            "supervisor": "Salesperson 3e0463a5c1" },
        {  "id": "70cb5dc-cc7c-78dc-02ee-5bb8da854e73e",
            "client": "Company 70cb5dc-cc7c",
            "date": "14-5-2022",
            "location": "Wdzydze Kiszewskie",
            "supervisor": "Salesperson 8da854e73e" }

    ]);

    const fetchById = async (id) => {
        const response = await fetch(`http://localhost:5111/Events/${id}`);
        const data = await response.json();
        return data;
    }

    const addEvents = async (Events) => {
        const response = await fetch('http://localhost:5111/Events', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(Events)
        });

        const data = await response.json();
        setEvents([...eventsList, data]);
    }

    const deleteEvents = async (id) => {
        await fetch(`http://localhost:5111/Events/${id}`, {method: 'DELETE',});
        setEvents(eventsList.filter((Events) => Events.id !== id));
    }

    const toggleInUse = async (id) => {
        const Events = await fetchById(id);
        const updated = {...Events, inUse: !Events.inUse};
        const response = await fetch(`http://localhost:5555/Events/${id}`, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updated)
        })

        const data = await response.json();
        setEvents(
            eventsList.map((Events) =>
                Events.id === id ? {...Events, inUse: data.inUse} : Events));
    }

    console.log("EventsList");
    console.log(eventsList);
    console.log("hardEventsList");
    console.log(hardEventsList);

    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Events</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item active">Events list</li>
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
                                    <th>Client</th>
                                    <th>Date</th>
                                    <th>Supervisor</th>
                                    <th>Location</th>
                                    <th>Details</th>
                                </tr>
                                </thead>
                                <tbody>
                                {hardEventsList.map((e) => (
                                    <tr key={e.id}>
                                        <td>{e.client}</td>
                                        <td>{e.date}</td>
                                        <td>{e.supervisor}</td>
                                        <td>{e.location}</td>
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

export default Events;
