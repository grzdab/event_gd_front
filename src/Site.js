import Login from './components/Login';
import App from './components/App';
import Layout from './components/Layout';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import PersistLogin from "./components/PersistLogin";
import Homepage from "./components/Homepage";
import Dashboard from "./components/dashboard/Dashboard";
import Test from "./components/Test";


const ROLES = {
  'User': 'ROLE_USER',
  'Manager': 'ROLE_MANAGER',
  'Admin': 'ROLE_ADMIN'
}

function Site() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      {/* public routes */}
      <Route path="login" element={<Login />} />
      {/*<Route path="homepage" element={<Homepage />} />*/}
      <Route path="unauthorized" element={<Unauthorized />} />

      {/* protected routes*/}
      <Route element={<PersistLogin />}>
        <Route path="home" element={<Homepage />} />
        <Route path="" element={<Homepage />} />
        <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
          <Route path="/app" element={<App />} >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="test" element={<Test />} />
          </Route>
        </Route>
      </Route>
        {/* catch all */}
      <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default Site;