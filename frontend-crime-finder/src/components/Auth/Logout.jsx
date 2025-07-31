import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Logout = () => {
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    localStorage.removeItem("crimeFinderAccessToken");
    setLoggedOut(true);
  }, []);

  return loggedOut ? <Navigate to="/login" /> : null;
};

export default Logout;
