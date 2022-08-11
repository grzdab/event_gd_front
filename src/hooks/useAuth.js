import { useContext } from "react";
import AppContext from "../context/ContextProvider";

const useAuth = () => {
  return useContext(AppContext);
}

export default useAuth;