import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/auth/auth-selectors";

export interface PublicRouteProps {
  component: JSX.Element;
  redirectTo?: string;
}

const PublicRoute = ({ component, redirectTo = "/" }: PublicRouteProps) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
};

export default PublicRoute;
