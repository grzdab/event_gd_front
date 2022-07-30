import React, { useRef, useState, useEffect } from 'react';
import "../css/Login.css";
import loginImg from '../assets/ram-login.jpg';
import axios from '../api/axios';
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";

const LOGIN_URL = '/api/login';

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; //allows to send the user back to the page they came from after successful login when they try to reach a link that needs authorization

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() =>  {
    userRef.current.focus();
  }, []);


  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post(LOGIN_URL + `?username=${user}&password=${pwd}`,
      //   {withCredentials: true
      // });

      const response = await axios.post(LOGIN_URL + `?username=${user}&password=${pwd}`,
        JSON.stringify({username:user, password:pwd}), {
        headers: { 'Content-type': 'application/json'},
        withCredentials: true
      });

      // console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      const rolesString = response?.data?.roles;
      const roles = rolesString.replaceAll(' ', '').replace(/\[|\]/g, '').split(',');
      setAuth({ user, roles, accessToken, refreshToken })
      setUser('');
      setPwd('');
      // setSuccess(true);
      // navigate(from, { replace: true });
      navigate("/app/dashboard");
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing username or password');
      } else if (err.response?.status === 403) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login failed');
      }
      errRef.current.focus();
    }
  }

  const togglePersist = () => {
    // console.log("PERSITS:" + persist);
    setPersist(prev => !prev);
  }

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist])



  return (
    <>
      <PageHeader />
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img src={ loginImg }
                   className="img-fluid rounded-1rem" alt="RAM login image" />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
              <h1>Sign In</h1>
              <form onSubmit={ handleSubmit }>

                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    placeholder="Enter your name..."
                  />
                  <label htmlFor="username">Login</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    placeholder="Enter your password..."
                  />
                  <label className="form-label" htmlFor="password">Password</label>
                </div>

                <div className="d-flex justify-content-around align-items-center mb-4">

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="persist"
                      checked={ persist }
                      onChange={ togglePersist }
                    />
                    <label className="form-check-label" htmlFor="persist"> Trust this device </label>
                  </div>
                  <a href="#!">Forgot password?</a>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary btn-lg">Sign in</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )

}

export default Login;