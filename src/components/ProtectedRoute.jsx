import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";

const ProtectedRoute = ({ children }) => {
  const { briefSubmitted } = useContext(GlobalContext);
  const location = useLocation();

  if (!briefSubmitted) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
