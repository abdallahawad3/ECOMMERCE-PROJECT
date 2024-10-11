import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  isAllowed: boolean;
  redirectPath: string;
  children: ReactNode;
}

const ProtectedRoutes = ({ children, isAllowed, redirectPath }: IProps) => {
  return isAllowed ? children : <Navigate to={redirectPath} />;
};

export default ProtectedRoutes;
