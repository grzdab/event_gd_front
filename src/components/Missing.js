import { Link } from "react-router-dom"
import missingImg from '../assets/404.jpg';
import Header from "./common/Header";
import React from "react";
import useAuth from "../hooks/useAuth";

const Missing = () => {

  return (
  <>
    <Header />
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img src={ missingImg }
                 className="img-fluid rounded-1rem" alt="RAM 404 image" />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <article style={{ padding: "100px" }}>
              <h1>Oops!</h1>
              <p>Page Not Found</p>
              <div className="flexGrow">
                <Link to="/">Visit Our Homepage</Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </>
)

}

export default Missing