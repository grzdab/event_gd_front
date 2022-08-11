import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();
  // console.log(`REFRESH TOKEN: ${auth.refreshToken}`);


  const refresh = async () => {
    const response = await axios.get('/api/token/refresh', {
      withCredentials: true, // allows to send cookies with request with token
      headers: {
        "Authorization": "Bearer " + auth.refreshToken
      }
    });

    setAuth(prev => {
      // console.log("PREVIOUS TOKENS: " + JSON.stringify(prev));
      // console.log("CURRENT ACCESS TOKEN: " + response.data.accessToken);
      const rolesString = response?.data?.roles;
      const roles = rolesString.replaceAll(' ', '').replace(/\[|\]/g, '').split(',');
      return {
        ...prev,
        user: response.data.username,
        accessToken: response.data.accessToken,
        roles: roles};
    });

    return response.data.accessToken;
  }

  return refresh;
}

export default useRefreshToken;