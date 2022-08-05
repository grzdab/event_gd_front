import {useNavigate, Link, BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { useEffect } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import PageHeader from "../common/PageHeader";
import LayoutSidebarLeft from "./layout/LayoutSidebarLeft";
import Home from "../Home";
import React from "react";
import Dashboard from "./dashboard/Dashboard";


const App = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/homepage');
  }

  return (
    <>
      <PageHeader valid={ true }/>
        <div id="layoutSidenav">
          <LayoutSidebarLeft />
            <Routes>
              <Route path='/app/dashboard' element={<Dashboard />} />
              <Route path='/home' element={<Home />} />
            </Routes>
          <Outlet />
        </div>
    </>
  )
}

export default App