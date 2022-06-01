import React, { useEffect } from 'react';
import './css/App.css';
import './css/datatables.css';
import sidebarToggler from './js/scripts';
import { Helmet } from 'react-helmet';
import LayoutSidebarLeft from "./components/LayoutSidebarLeft.js";
import LayoutContent from "./components/LayoutContent.js";
import Header from "./components/Header";

function App() {

    useEffect(() => {
        sidebarToggler();
    }, [])

    return (
    <div className='sb-nav-fixed'>
      <Header />
        <div id="layoutSidenav">
            <LayoutSidebarLeft />
            <LayoutContent />
        </div>
        <Helmet>
            {/*<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossOrigin="anonymous"></script>*/}
            <script src="./js/simple-databases.js" />
            <script src="./js/datatables-simple-demo.js" />
            <script src="./js/datatables-demo.js" />
            {/*<script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" crossOrigin="anonymous"></script>*/}
        </Helmet>
        </div>
  );
}

export default App;