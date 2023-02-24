import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/auth/auth-selectors";
import { PublicRouteProps } from "./PublicRoute";

const PrivateRoute = ({ component, redirectTo = "/" }: PublicRouteProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
