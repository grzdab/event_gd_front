import { Outlet } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        // console.log("get cookie with refresh token, send it to get new access token");
        // get cookie with refresh token, send it to get new access token
        await refresh();
      } catch (err) {
        console.error(err);
      }
      finally {
        isMounted && setIsLoading(false);
      }
    }

    // call verifyRefreshToken only if there's no accessToken present in auth
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => isMounted = false;
  }, []);


  useEffect(() => {
    // console.log(`isLoading: ${isLoading}`)
    // console.log(`Access Token: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading])

  return (
    <>
      {!persist
        ? <Outlet />
        : isLoading
          ? <p>Loading...</p>
          : <Outlet />
      }
    </>
  )
}

export default PersistLogin;