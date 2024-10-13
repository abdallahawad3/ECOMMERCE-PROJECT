import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { Toaster } from "react-hot-toast";
import CartDrawer from "./components/CartDrawer";
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
      <CartDrawer />
    </>
  );
};

export default App;
