import { Link } from "react-router-dom"
import missingImg from '../assets/404.jpg';
import PageHeader from "./common/PageHeader";
import React from "react";
import useAuth from "../hooks/useAuth";

const Missing = () => {

  return (
  <>
    <PageHeader />
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img src={ missingImg }
                 className="img-fluid rounded-1rem" alt="RAM 404 image" />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <div style={{ padding: "100px" }}>
              <h1>Oops!</h1>
              <h3>That's pity, but we couldn't find the requested page</h3>
              {/*<div className="flexGrow">*/}
              {/*  <Link to="/locahost">Visit Our Homepage</Link>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
)

}

export default Missing