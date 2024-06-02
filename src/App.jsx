import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainerComponent } from "./components/Toast/Toast";

import LoginRegister from "./pages/LoginRegisterPage/LoginRegisterPage";
import Dashboard from "./pages/DashboardPage/Dashboard";
import Analytics from "./pages/AnalyticsPage/Analytics";
import Activity from "./pages/CreateActivityPage/CreateActivity";
import CreateQuestions from "./pages/CreateQuestionsPage/CreateQuestions";
import QuizPoll from "./pages/QuizPollPage/QuizPoll";
import QuestionAnalysis from "./pages/QuestionAnalysisPage/QuestionAnalysis";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import ActivityShare from "./pages/ActivitySharePage/ActivityShare";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/analytics" element={<Analytics />}>
              <Route
                path="/analytics/questionAnalysis"
                element={<QuestionAnalysis />}
              />
            </Route>
            <Route path="/createActivity" element={<Activity />} />
            <Route path="/activityShare" element={<ActivityShare />} />
            <Route path="/createQuestions" element={<CreateQuestions />} />
            <Route path="/quiz/:id" element={<QuizPoll />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainerComponent />
    </>
  );
}

export default App;
