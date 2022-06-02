import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBuilding, faCalendarAlt, faListAlt, faCubes} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import logo from '../assets/ram-logo.png';

const LayoutSidebarLeft = () => {
  return (
      <div id="layoutSidenav_nav">
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading">Core</div>
              <a className="nav-link" href="/">
                <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faCalendarAlt}></FontAwesomeIcon></div>
                Dashboard
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
              <div className="sb-sidenav-menu-heading">Addons</div>
              <a className="nav-link" href="charts.html">
                <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                Charts
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
