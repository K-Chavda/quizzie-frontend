import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainerComponent } from "./components/Toast/Toast";

import LoginRegister from "./pages/LoginRegisterPage/LoginRegisterPage";
import Dashboard from "./pages/DashboardPage/Dashboard";
import Analytics from "./pages/AnalyticsPage/Analytics";
import Activity from "./pages/CreateActivityPage/CreateActivity";
import CreateQuestions from "./pages/CreateQuestionsPage/CreateQuestions";
import QuizPoll from "./pages/QuizPollPage/QuizPoll";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/createActivity" element={<Activity />} />
          <Route path="/createQuestions" element={<CreateQuestions />} />
          <Route path="/quiz/:id" element={<QuizPoll />} />
        </Routes>
      </BrowserRouter>
      <ToastContainerComponent />
    </>
  );
}

export default App;
