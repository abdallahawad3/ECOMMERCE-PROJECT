import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import HomePage from "../pages";
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/Dashboard";
import DashboardPage from "../pages/Dashboard";
import AboutPage from "../pages/About";
import CartPage from "../pages/Cart";
import ContactPage from "../pages/Contact";
import ErrorHandler from "../components/errors/ErrorHandler";
import LoginPage from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoutes from "../components/auth/ProtectedRoutes";
import NotFoundPage from "../pages/NotFoundPage";

const isAllowed = false;
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* ROOT LAYOUT */}
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route index element={<HomePage />} />
        <Route
          path="cart"
          element={
            <ProtectedRoutes isAllowed={isAllowed} redirectPath="/login">
              <CartPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="about"
          element={
            <ProtectedRoutes isAllowed={isAllowed} redirectPath="/login">
              <AboutPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="contact"
          element={
            <ProtectedRoutes isAllowed={isAllowed} redirectPath="/login">
              <ContactPage />
            </ProtectedRoutes>
          }
        />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<Register />} />
      </Route>
      {/* Dashboard Layout */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route
          index
          element={
            <ProtectedRoutes isAllowed={isAllowed} redirectPath="/login">
              <DashboardPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="cart"
          element={
            <ProtectedRoutes isAllowed={isAllowed} redirectPath="/login">
              <CartPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="about"
          element={
            <ProtectedRoutes isAllowed={isAllowed} redirectPath="/login">
              <AboutPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="contact"
          element={
            <ProtectedRoutes redirectPath="/login" isAllowed={isAllowed}>
              <ContactPage />
            </ProtectedRoutes>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);

export default router;
