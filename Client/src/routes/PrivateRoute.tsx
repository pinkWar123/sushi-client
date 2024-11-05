import { FunctionComponent } from "react";
import { Navigate, Route } from "react-router-dom";
import { PATH } from "../constants/paths";

interface PrivateRouteProps {
  isAuthenticated: boolean;
  component: React.ElementType;
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = (
  props: PrivateRouteProps
) => {
  const { isAuthenticated, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      element={
        !isAuthenticated && !localStorage.getItem("user") ? (
          <Navigate to={PATH.HOME} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
