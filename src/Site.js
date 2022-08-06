import Register from './auth/Register';
import Login from './auth/Login';
import App from './components/app/App';
import Layout from './components/app/layout/Layout';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
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
import TableTest from "./components/app/tables_test/TableTest";
import EquipmentStatus from "./components/app/admin/equipment_statuses/EquipmentStatus";
import EquipmentOwnership from "./components/app/admin/equipment_ownership_types/EquipmentOwnership";
import EquipmentBookingStatus from "./components/app/admin/equipment_booking_statuses/EquipmentBookingStatus";
import Client from "./components/app/client/Client";
import User from "./components/app/user/User";
import ComponentTest from "./components/app/component_test/ComponentTest";
import Events from "./components/app/events_test/Events";

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
            <Route path="events_test" element={<Events />} />
            <Route path="scheduler" element={<ComponentTest />} />
            <Route path="component_test" element={<ComponentTest />} />
            <Route path="test" element={<TableTest />} />
            <Route path="equipment" element={<Equipment />} />
            <Route path="equipment-status" element={<EquipmentStatus />} />
            <Route path="equipment-ownership" element={<EquipmentOwnership />} />
            <Route path="equipment-booking-status" element={<EquipmentBookingStatus />} />
            <Route path="clients" element={<Client />} />
            <Route path="users" element={<User />} />
            <Route path="equipment-category" element={<EquipmentCategory />} />
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