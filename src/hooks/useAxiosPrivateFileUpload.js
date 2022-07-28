import { axiosPrivateFileUpload } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivateFileUpload = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {

    const requestIntercept = axiosPrivateFileUpload.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      }, (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivateFileUpload.interceptors.response.use(
      response => response,
      async (error) => {
        // this is when access token expires
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivateFileUpload(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    // clean-up hook
    return () => {
      axiosPrivateFileUpload.interceptors.request.eject(requestIntercept);
      axiosPrivateFileUpload.interceptors.response.eject(responseIntercept);
    }

  },[auth, refresh])

  return axiosPrivateFileUpload;
}

export default useAxiosPrivateFileUpload;