import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainerComponent } from "./components/Toast/Toast";

import LoginRegister from "./pages/LoginRegisterPage/LoginRegisterPage";
import Home from "./pages/HomePage/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginRegister />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainerComponent />
    </>
  );
}

export default App;
