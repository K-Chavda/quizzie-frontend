import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainerComponent } from "./components/Toast/Toast";

import LoginRegister from "./pages/LoginRegisterPage/LoginRegisterPage";
import Dashboard from "./pages/DashboardPage/Dashboard";
import Analytics from "./pages/AnalyticsPage/Analytics";
import Activity from "./pages/CreateActivityPage/Activity";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginRegister />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/analytics",
    element: <Analytics />,
  },

  {
    path: "/create",
    element: <Activity />,
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
