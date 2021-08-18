import { UIView } from "@uirouter/react";
import { useState } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const [state, setState] = useState({
    isAuthenticated: false,
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
  });
  const { isAuthenticated, accessToken, refreshToken } = state;
  
  const setTokens = (accessToken, refreshToken) => {
    setState(state => ({...state, accessToken, refreshToken}))
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('accessToken', accessToken)
  }

  const setAuth = (isAuthenticated) => {
    setState(state => ({...state, isAuthenticated}))
  }

  const reset = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    return {
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
    }
  }
  
  return (
    <AuthContext.Provider value={{
      isAuthenticated, accessToken, refreshToken, setTokens, setAuth, reset
    }}>
      <UIView />
    </AuthContext.Provider>
  );
}

export default App;
