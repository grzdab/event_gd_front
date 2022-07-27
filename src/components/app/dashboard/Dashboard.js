import React, {Component} from 'react';
import '../../../css/datatables.css';

import notification_icon from '../../../assets/notification_sm.png';
import events_icon from '../../../assets/events_icon_sm_bw.png';
import client_icon from '../../../assets/clients_icon_sm_bw.png';
import equipment_icon from '../../../assets/equipment_icon_sm_bw.png';
import settings_icon from '../../../assets/settings_icon_sm_bw.png';


const Dashboard = () => {
        return (
            <div id="layoutSidenav_content">
                <header className="py-1 bg-image p-5 text-center shadow-1-strong mb-5 text-white"
                        style={{
                            backgroundImage: "url(" + "/images/background1.jpg" + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}>
                    <div className="container px-5">
                        <div className="row gx-5 justify-content-center">
                            <div className="col-lg-6">
                                <div className="text-center my-5">
                                    <h1 className="display-5 fw-bolder text-white mb-2">Dashboard</h1>
                                    <p className="lead text-white-50 mb-4">Choose an action from options below</p>
                                    <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                                        <a className="btn btn-outline-light btn-lg px-4" href="/help">Learn more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="container-fluid px-4">
                        <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item active">/Dashboard</li>
                        </ol>
                        <div className="row">
                            <div className="col-xl-3 col-md-6">
                                <div className="card ram-card text-center ram-bg-gradient-blue text-white mb-4">
                                    <div className="ram-card-body">
                                        <img src={events_icon}></img>
                                        <div>Manage Events</div>
                                    </div>
                                    <div className="ram-card-notification"><img src={notification_icon}></img>&nbsp;&nbsp;&nbsp;Events Today: 12</div>
                                    <div className="card-footer ram-d-flex align-items-center justify-content-between">
                                        <a className="btn btn-outline-light btn-lg px-4" href="/events">Go</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card ram-card text-center ram-bg-gradient-purple text-white mb-4">
                                    <div className="ram-card-body">
                                        <img src={client_icon}></img>
                                        <div>Manage Clients</div>
                                    </div>
                                    <div className="card-footer ram-d-flex align-items-center justify-content-between">
                                        <a className="btn btn-outline-light btn-lg px-4" href="/clients">Go</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card ram-card text-center ram-bg-gradient-pink text-white mb-4">
                                    <div className="ram-card-body">
                                        <img src={equipment_icon}></img>
                                        <div>Manage Equipment</div>
                                    </div>
                                    <div className="card-footer ram-d-flex align-items-center justify-content-between">
                                        <a className="btn btn-outline-light btn-lg px-4" href="/equipment">Go</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card ram-card text-center ram-bg-gradient-orange text-white mb-4">
                                    <div className="ram-card-body">
                                        <img src={settings_icon}></img>
                                        <div>Application Settings</div>
                                    </div>
                                    <div className="card-footer ram-d-flex align-items-center justify-content-between">
                                        <a className="btn btn-outline-light btn-lg px-4" href="/settings">Go</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Your Website 2022</div>
                            <div>
                                <a href="src/components/app/dashboard/Dashboard#">Privacy Policy</a>
                                &middot;
                                <a href="src/components/app/dashboard/Dashboard#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
}

export default Dashboard;