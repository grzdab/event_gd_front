import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Collection, Building, Toggles2, Envelope, ChatRightQuoteFill } from "react-bootstrap-icons";
import useAuth from '../../hooks/useAuth';
import PageHeader from "../layout/PageHeader";
import '../../css/Homepage.css';

const Homepage = () => {

  const { auth } = useAuth();

  useEffect(() => {
    console.log(`USER: ${auth.user}`);
  }, [])

  return (
    <div>
      <PageHeader />
      <header className="py-5 bg-image p-5 text-center shadow-1-strong rounded mb-5 text-white"
              style={{backgroundImage: "url(" + "/images/background1.jpg" + ")" }}>
        <div className="container px-5">
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-6">
              <div className="text-center my-5">
                <h1 className="display-5 fw-bolder text-white mb-2">Take your rental services to a whole new level</h1>
                <p className="lead text-white-50 mb-4">Efficiently manage your resources and clients and bind them
                  together!</p>
                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                  <Link to="/login" className="btn btn-primary btn-lg px-4 me-sm-3">Get Started</Link>
                  <a className="btn btn-outline-light btn-lg px-4" href="#!">Learn More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="py-5 border-bottom" id="features">
        <div className="container px-5 my-5">
          <div className="row gx-5">
            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="btn btn-primary btn-lg px-2 me-sm-2 mb-3"><Collection className="hp-bs-icon"/></div>
              <h2 className="h4 fw-bolder">Handle events</h2>
              <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence
                and probably just keep going until we run out of words.</p>
              <a className="text-decoration-none" href="#!">
                Learn more
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="btn btn-primary btn-lg px-2 me-sm-2 mb-3"><Building className="hp-bs-icon"/></div>
              <h2 className="h4 fw-bolder">Manage client and resources</h2>
              <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence
                and probably just keep going until we run out of words.</p>
              <a className="text-decoration-none" href="#!">
                Learn more
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
            <div className="col-lg-4">
              <div className="btn btn-primary btn-lg px-2 me-sm-2 mb-3"><Toggles2 className="hp-bs-icon"/></div>
              <h2 className="h4 fw-bolder">Process documents</h2>
              <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence
                and probably just keep going until we run out of words.</p>
              <a className="text-decoration-none" href="#!">
                Learn more
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-light py-5 border-bottom">
        <div className="container px-5 my-5">
          <div className="text-center mb-5">
            <h2 className="fw-bolder">Pay as you grow</h2>
            <p className="lead mb-0">With our no hassle pricing plans</p>
          </div>
          <div className="row gx-5 justify-content-center">

            <div className="col-lg-6 col-xl-4">
              <div className="card mb-5 mb-xl-0">
                <div className="card-body p-5">
                  <div className="small text-uppercase fw-bold text-muted">Basic</div>
                  <div className="mb-3">
                    <span className="display-4 fw-bold">$99</span>
                    <span className="text-muted">/ mo.</span>
                  </div>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      <strong>5 users</strong>
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      5GB storage
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      Unlimited public projects
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      Community access
                    </li>
                    <li className="mb-2 text-muted">
                      <i className="bi bi-x"></i>
                      Unlimited private projects
                    </li>
                    <li className="mb-2 text-muted">
                      <i className="bi bi-x"></i>
                      Dedicated support
                    </li>
                    <li className="mb-2 text-muted">
                      <i className="bi bi-x"></i>
                      Free linked domain
                    </li>
                    <li className="text-muted">
                      <i className="bi bi-x"></i>
                      Monthly status reports
                    </li>
                  </ul>
                  <div className="d-grid"><a className="btn btn-outline-primary" href="#!">Choose plan</a></div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-xl-4">
              <div className="card mb-5 mb-xl-0">
                <div className="card-body p-5">
                  <div className="small text-uppercase fw-bold">
                    <i className="bi bi-star-fill text-warning"></i>
                    Pro
                  </div>
                  <div className="mb-3">
                    <span className="display-4 fw-bold">$199</span>
                    <span className="text-muted">/ mo.</span>
                  </div>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      <strong>20 users</strong>
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      5GB storage
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      Unlimited public projects
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      Community access
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      Unlimited private projects
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      Dedicated support
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      Free linked domain
                    </li>
                    <li className="text-muted">
                      <i className="bi bi-x"></i>
                      Monthly status reports
                    </li>
                  </ul>
                  <div className="d-grid"><a className="btn btn-primary" href="#!">Choose plan</a></div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-xl-4">
              <div className="card">
                <div className="card-body p-5">
                  <div className="small text-uppercase fw-bold text-muted">Enterprise</div>
                  <div className="mb-3">
                    <span className="display-4 fw-bold">$249</span>
                    <span className="text-muted">/ mo.</span>
                  </div>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      <strong>Unlimited users</strong>
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      5GB storage
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      Unlimited public projects
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      Community access
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      Unlimited private projects
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      Dedicated support
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check text-primary"></i>
                      <strong>Unlimited</strong>
                      linked domains
                    </li>
                    <li className="text-muted">
                      <i className="bi bi-check text-primary"></i>
                      Monthly status reports
                    </li>
                  </ul>
                  <div className="d-grid"><a className="btn btn-outline-primary" href="#!">Choose plan</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 border-bottom">
        <div className="container px-5 my-5 px-5">
          <div className="text-center mb-5">
            <h2 className="fw-bolder">Customer testimonials</h2>
            <p className="lead mb-0">Our customers love working with us</p>
          </div>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-6">

              <div className="card mb-4">
                <div className="card-body p-4">
                  <div className="d-flex">
                    <div className="btn btn-primary btn-lg px-2 me-sm-2 mb-3"><ChatRightQuoteFill className="hp-bs-icon"/></div>
                    <div className="ms-4">
                      <p className="mb-1">Thank you for putting together such a great product. We loved working with you
                        and the whole team, and we will be recommending you to others!</p>
                      <div className="small text-muted">- Client Name, Location</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body p-4">
                  <div className="d-flex">
                    <div className="btn btn-primary btn-lg px-2 me-sm-2 mb-3"><ChatRightQuoteFill className="hp-bs-icon"/></div>
                    <div className="ms-4">
                      <p className="mb-1">The whole team was a huge help with putting things together for our company
                        and brand. We will be hiring them again in the near future for additional work!</p>
                      <div className="small text-muted">- Client Name, Location</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container px-5 my-5 px-5">
          <div className="text-center mb-5">
            <div className="btn btn-primary btn-lg px-2 me-sm-2 mb-3"><Envelope className="hp-bs-icon"/></div>
            <h2 className="fw-bolder">Get in touch</h2>
            <p className="lead mb-0">We'd love to hear from you</p>
          </div>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-6">
              <form id="contactForm">
                <div className="form-floating mb-3">
                  <input className="form-control" id="name" type="text" placeholder="Enter your name..."/>
                  <label htmlFor="name">Full name</label>
                  <div className="invalid-feedback">A name is required.</div>
                </div>

                <div className="form-floating mb-3">
                  <input className="form-control" id="email" type="email" placeholder="name@example.com"/>
                  <label htmlFor="email">Email address</label>
                  <div className="invalid-feedback" >An email is required.</div>
                  <div className="invalid-feedback" >Email is not valid.</div>
                </div>

                <div className="form-floating mb-3">
                  <input className="form-control" id="phone" type="tel" placeholder="(123) 456-7890"
                         />
                  <label htmlFor="phone">Phone number</label>
                  <div className="invalid-feedback" >A phone number is required.
                  </div>
                </div>

                <div className="form-floating mb-3">
                  <textarea className="form-control" id="message" type="text" placeholder="Enter your message here..."
                            style={{height: "10rem"}}></textarea>
                  <label htmlFor="message">Message</label>
                  <div className="invalid-feedback" >A message is required.</div>
                </div>

                <div className="d-none" id="submitSuccessMessage">
                  <div className="text-center mb-3">
                    <div className="fw-bolder">Form submission successful!</div>
                  </div>
                </div>

                <div className="d-grid">
                  <button className="btn btn-primary btn-lg disabled" id="submitButton" type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>


        </div>
      </section>


    </div>
  );
};

export default Homepage;
