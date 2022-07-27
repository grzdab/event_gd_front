import React, {Component} from 'react';
import useAuth from '../../hooks/useAuth';
import useLogout from "../../hooks/useLogout";
import {Link, useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";


const Header = () => {

  const logout = useLogout();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const signOut = async () => {
    await logout();
    navigate('/');
  }

  const signIn = () => {
    navigate('/login')
  }
        return (
            <nav className="navbar justify-content-between navbar-dark bg-dark">
                <Link className="navbar-brand ps-3" to="/">Welcome to R.A.M.</Link>
              <div style={{display: "flex"}}>
              <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>
                <div style={{ color: "white" }}>
                { auth?.user ? (
                  <>
                    <span className="">Logged in as { auth.user }</span>
                    <Button className="mx-3" onClick={signOut}>Sign Out</Button>
                  </>
                  )
                  : (
                    <>
                    <span className="mx-4">You are not logged in</span>
                    {/*<Button onClick={signIn}>Sign In</Button>*/}
                    </>
                  )
                }
                 </div>

                {/*<ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">*/}
                {/*    <li className="nav-item dropdown">*/}
                {/*        <a className="nav-link dropdown-toggle" id="navbarDropdown" href="src/components/app/layout/Header#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>*/}
                {/*        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">*/}
                {/*            <li><a className="dropdown-item" href="src/components/app/layout/Header#!">Settings</a></li>*/}
                {/*            <li><a className="dropdown-item" href="src/components/app/layout/Header#!">Activity Log</a></li>*/}
                {/*            <li><hr className="dropdown-divider" /></li>*/}
                {/*            <li><a className="dropdown-item" href="http://localhost:8080/logout">Logout</a></li>*/}
                {/*        </ul>*/}
                {/*    </li>*/}
                {/*</ul>*/}
              </div>
            </nav>
        );

}

export default Header;