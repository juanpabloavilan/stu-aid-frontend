import { createContext, useState } from "react";

export const AuthStorageContext = createContext(null);

const AuthStorageProvider = ({ children, authStorage: AuthStorageProp }) => {
  const [authStorage, setAuthStorage] = useState(AuthStorageProp);
  return (
    <AuthStorageContext.Provider value={authStorage}>
      {children}
    </AuthStorageContext.Provider>
  );
};

export default AuthStorageProvider;
