import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding, faCalendarAlt, faListAlt, faCubes, faUsers} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import logo from '../../assets/ram-logo.png';
import {faFileInvoice} from "@fortawesome/free-solid-svg-icons/faFileInvoice";
import {faFileContract} from "@fortawesome/free-solid-svg-icons/faFileContract";
import {faFaceGrinWide} from "@fortawesome/free-solid-svg-icons/faFaceGrinWide";
import {faGrip} from "@fortawesome/free-solid-svg-icons/faGrip";

const LayoutSidebarLeft = () => {
  return (
      <div id="layoutSidenav_nav">
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading">Core</div>
              <a className="nav-link" href="/Codecool/El Proyecte Grande/event-front/public">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faGrip}/></div>
                Dashboard
              </a>
              <a className="nav-link" href="/Codecool/El Proyecte Grande/event-front/public">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faCalendarAlt}></FontAwesomeIcon></div>
                Scheduler
              </a>
              <div className="sb-sidenav-menu-heading">Resources</div>
              <a className="nav-link" href="/events">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faListAlt}></FontAwesomeIcon></div>
                Events
              </a>
              <a className="nav-link" href="/clients">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faBuilding}></FontAwesomeIcon></div>
                Clients
              </a>
              <a className="nav-link" href="/equipment">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faCubes}></FontAwesomeIcon></div>
                Equipment
              </a>
              <a className="nav-link" href="/equipment">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faUsers}></FontAwesomeIcon></div>
                Human resources
              </a>
              <div className="sb-sidenav-menu-heading">Documents</div>
              <a className="nav-link" href="/equipment">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faFileInvoice}></FontAwesomeIcon></div>
                Invoices
              </a>
              <a className="nav-link" href="/equipment">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faFileContract}></FontAwesomeIcon></div>
                Contracts
              </a>
              <div className="sb-sidenav-menu-heading">Settings</div>
              <a className="nav-link" href="/equipment-category">
                <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                Equipment categories
              </a>
              <a className="nav-link" href="/client-type">
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
            <div className="small">Logged in as:</div>
            Administrator
          </div>
        </nav>
      </div>
  )
};

export default LayoutSidebarLeft;
