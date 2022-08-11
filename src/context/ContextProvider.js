import { createContext, useState} from "react";

const AppContext = createContext({});

export const ContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [contextItems, setContextItems] = useState([]);
  const [contextCurrentItem, setContextCurrentItem] = useState({});

  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

  return (
    <AppContext.Provider value={{
      auth, setAuth,
      persist, setPersist,
      contextItems, setContextItems,
      contextCurrentItem, setContextCurrentItem
    }}>
      { children }
    </AppContext.Provider>
  )
}

export default AppContext;
