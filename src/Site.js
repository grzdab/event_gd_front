import Register from './auth/Register';
import Login from './auth/Login';
import App from './components/app/App';
import Layout from './components/app/layout/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './auth/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import PersistLogin from "./auth/PersistLogin";
import Homepage from "./components/homepage/Homepage";
import Dashboard from "./components/app/dashboard/Dashboard";
import Test from "./components/Test";
import EquipmentCategory from "./components/app/admin/EquipmentCategory";
import Equipment from "./components/app/equipment/Equipment";

import './css/App.css';
import './css/Form.css';
import './css/datatables.css';
import TableTest from "./components/app/tables_test/TableTest";
import EquipmentStatus from "./components/app/admin/EquipmentStatus";
import EquipmentOwnership from "./components/app/admin/EquipmentOwnership";
import EquipmentBookingStatus from "./components/app/admin/EquipmentBookingStatus";
import Client from "./components/app/client/Client";
import User from "./components/app/user/User";
import ComponentTest from "./components/app/component_test/ComponentTest";

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
      <Route path="linkpage" element={<LinkPage />} />
      {/*<Route path="homepage" element={<Homepage />} />*/}
      <Route path="unauthorized" element={<Unauthorized />} />

      {/* protected routes*/}
      <Route element={<PersistLogin />}>
        <Route path="home" element={<Homepage />} />
        <Route path="" element={<Homepage />} />
        <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
          <Route path="/app" element={<App />} >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="scheduler" element={<ComponentTest />} />
            <Route path="component_test" element={<ComponentTest />} />
            <Route path="test" element={<TableTest />} />
            <Route path="equipment" element={<Equipment />} />
            <Route path="equipment-status" element={<EquipmentStatus />} />
            <Route path="equipment-ownership" element={<EquipmentOwnership />} />
            <Route path="equipment-booking-status" element={<EquipmentBookingStatus />} />
            <Route path="clients" element={<Client />} />
            <Route path="users" element={<User />} />
            <Route path="linkpage" element={<LinkPage />} />
            <Route path="equipment-category" element={<EquipmentCategory />} />
          </Route>
        </Route>

        {/*<Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>*/}
        {/*  <Route path="app/dashboard" element={<Dashboard />} />*/}
        {/*</Route>*/}

        <Route element={<RequireAuth allowedRoles={[ROLES.Manager]} />}>
          <Route path="app/editor" element={<Editor />} />
        </Route>


        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="app/admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
          <Route path="app/lounge" element={<Lounge />} />
        </Route>
      </Route>
        {/* catch all */}
      <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default Site;