import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainerComponent } from "./components/Toast/Toast";

import LoginRegister from "./pages/LoginRegisterPage/LoginRegisterPage";
import Dashboard from "./pages/DashboardPage/Dashboard";
import Analytics from "./pages/AnalyticsPage/Analytics";
import Activity from "./pages/CreateActivityPage/CreateActivity";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/createActivity" element={<Activity />} />
        </Routes>
      </BrowserRouter>
      <ToastContainerComponent />
    </>
  );
}

export default App;
