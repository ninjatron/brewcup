import { useContext, createContext } from "react";

const AuthContext = createContext(null);

const useAuthContext = () => {
  return useContext(AuthContext);
}

export { 
  useAuthContext,
  AuthContext
};