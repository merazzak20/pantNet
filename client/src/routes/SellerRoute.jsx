import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import PropTypes from "prop-types";

const SellerRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (role === "seller") return children;
  return <Navigate to="/dashboard" replace="true" />;
};
SellerRoute.propTypes = {
  children: PropTypes.element,
};

export default SellerRoute;
