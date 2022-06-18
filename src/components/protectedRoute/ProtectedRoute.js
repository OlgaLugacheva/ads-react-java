import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, redirectPath = "/landing", children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
