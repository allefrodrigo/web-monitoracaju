import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check user authentication here (e.g., token, cookie)
    // If authenticated, set isAdmin to true; otherwise, set it to false
    // Example: const isAuthenticated = checkAuthentication();
    // setIsAdmin(isAuthenticated);
    setIsAdmin(true); // For demonstration purposes
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
