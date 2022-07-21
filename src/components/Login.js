import React, { useRef, useState, useEffect } from 'react';
import axios from '../api/axios';
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

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
      navigate("/app");
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
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button>Sign In</button>
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            onChange={ togglePersist }
            checked={ persist }
          />
          <label htmlFor="persist">Trust this device</label>
        </div>
      </form>
      <p>
        Need an Account?&nbsp;
        <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </section>
  )

}

export default Login;