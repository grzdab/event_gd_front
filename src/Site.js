import Register from './components/homepage/Register';
import Login from './components/homepage/Login';
import App from './components/app/App';
import Layout from './components/layout/Layout';
import Missing from './components/app/missing/Missing';
import Unauthorized from './components/app/unathorized/Unauthorized';
import RequireAuth from './auth/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import PersistLogin from "./auth/PersistLogin";
import Homepage from "./components/homepage/Homepage";
import Dashboard from "./components/app/dashboard/Dashboard";
import EquipmentCategory from "./components/app/admin/equipment_categories/EquipmentCategory";
import Equipment from "./components/app/equipment/Equipment";

import './css/App.css';
import './css/Form.css';
import './css/datatables.css';

import EquipmentStatus from "./components/app/admin/equipment_statuses/EquipmentStatus";
import EquipmentOwnership from "./components/app/admin/equipment_ownership_types/EquipmentOwnership";
import EquipmentBookingStatus from "./components/app/admin/equipment_booking_statuses/EquipmentBookingStatus";
import Client from "./components/app/client/Client";
import User from "./components/app/admin/users/Users";
import Roles from "./components/app/admin/roles/Roles";
import ClientBranches from "./components/app/admin/client_branches/ClientBranches";
import ClientType from "./components/app/admin/client_type/ClientType";
import ClientCategories from "./components/app/admin/client_categories/ClientCategories";


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
      <Route path="register" element={<Register />} />
      {/*<Route path="homepage" element={<Homepage />} />*/}
      <Route path="unauthorized" element={<Unauthorized />} />

      {/* protected routes*/}
      <Route element={<PersistLogin />}>
        <Route path="home" element={<Homepage />} />
        <Route path="" element={<Homepage />} />
        <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
          <Route path="/app" element={<App />} >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="equipment" element={<Equipment />} />
            <Route path="equipment-status" element={<EquipmentStatus />} />
            <Route path="equipment-ownership" element={<EquipmentOwnership />} />
            <Route path="equipment-booking-status" element={<EquipmentBookingStatus />} />
            <Route path="clients" element={<Client />} />
            <Route path="users" element={<User />} />
            <Route path="roles" element={<Roles />} />
            <Route path="equipment-category" element={<EquipmentCategory />} />
            <Route path="client-branches" element={<ClientBranches />} />
            <Route path="client-type" element={<ClientType />} />
            <Route path="client-category" element={<ClientCategories />} />
          </Route>
        </Route>

        {/*<Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>*/}
        {/*  <Route path="app/dashboard" element={<Dashboard />} />*/}
        {/*</Route>*/}
      </Route>
        {/* catch all */}
      <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default Site;