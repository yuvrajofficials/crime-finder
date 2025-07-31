
import { Navigate, Outlet } from "react-router-dom";

const AuthCheck = () => {
  const user = localStorage.getItem("crimeFinderAccessToken");
  const token = JSON.parse(user);
  return token.accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthCheck;
