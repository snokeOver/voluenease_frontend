import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";
import PageSkeleton from "../components/shared/PageSkeleton";

const PublicRoutes = ({ children }) => {
  const { user, loading, regiSuccess } = useContext(AuthContext);

  if (loading) {
    return <PageSkeleton />;
  }
  if (!user || regiSuccess) {
    return children;
  }
  return <Navigate to="/"></Navigate>;
};

export default PublicRoutes;
