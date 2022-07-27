import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding, faCalendarAlt, faListAlt, faCubes, faUsers} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import '../../../css/App.css';
import logo from '../../../assets/ram-logo.png';
import {faFileInvoice} from "@fortawesome/free-solid-svg-icons/faFileInvoice";
import {faFileContract} from "@fortawesome/free-solid-svg-icons/faFileContract";
import {faFaceGrinWide} from "@fortawesome/free-solid-svg-icons/faFaceGrinWide";
import { faGrip } from "@fortawesome/free-solid-svg-icons/faGrip";
import useAuth from '../../../hooks/useAuth';

const LayoutSidebarLeft = () => {

  const { auth } = useAuth();

  return (
      <div id="layoutSidenav_nav">
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading">Core</div>
              <a className="nav-link" href="/app/dashboard">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faGrip}/></div>
                Dashboard
              </a>
              <a className="nav-link" href="/app/scheduler">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faCalendarAlt}></FontAwesomeIcon></div>
                Scheduler
              </a>
              <div className="sb-sidenav-menu-heading">Resources</div>
              <a className="nav-link" href="/app/events">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faListAlt}></FontAwesomeIcon></div>
                Events
              </a>
              <a className="nav-link" href="/app/test">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faBuilding}></FontAwesomeIcon></div>
                Clients
              </a>
              <a className="nav-link" href="/app/equipment">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faCubes}></FontAwesomeIcon></div>
                Equipment
              </a>
              <a className="nav-link" href="/app/human-resources">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faUsers}></FontAwesomeIcon></div>
                Human resources
              </a>
              <div className="sb-sidenav-menu-heading">Documents</div>
              <a className="nav-link" href="/app/invoices">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faFileInvoice}></FontAwesomeIcon></div>
                Invoices
              </a>
              <a className="nav-link" href="/app/contracts">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faFileContract}></FontAwesomeIcon></div>
                Contracts
              </a>
              <div className="sb-sidenav-menu-heading">Settings</div>
              {auth?.roles?.includes("ROLE_ADMIN") ?
                <a className="nav-link" href="/app/equipment-category">
                  <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                  Equipment categories
                </a> : ""
              }
              <a className="nav-link" href="/app/client-type">
                <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                Client types
              </a>
              <a className="nav-link" href="tables.html">
                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                Tables
              </a>
              <img src={logo} className="App-logo" alt="logo" />
            </div>
          </div>
          <div className="sb-sidenav-footer">
            <div className="small">Logged in as: { auth.user } </div>
          </div>
        </nav>
      </div>
  )
};

export default LayoutSidebarLeft;
