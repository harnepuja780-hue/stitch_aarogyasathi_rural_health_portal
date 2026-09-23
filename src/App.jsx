import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import HealthTopics from './pages/HealthTopics';
import GovernmentSchemes from './pages/GovernmentSchemes';
import HealthTips from './pages/HealthTips';
import AiAssistant from './pages/AiAssistant';
import Profile from './pages/Profile';
import PeriodTracker from './pages/PeriodTracker';
import Quizzes from './pages/Quizzes';
import Nutrition from './pages/Nutrition';
import PeriodHealth from './pages/PeriodHealth';
import Pregnancy from './pages/Pregnancy';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/health" element={<Layout><HealthTopics /></Layout>} />
        <Route path="/schemes" element={<Layout><GovernmentSchemes /></Layout>} />
        <Route path="/periods" element={<PeriodHealth />} />
        <Route path="/period-tracker" element={<Layout><PeriodTracker /></Layout>} />
        <Route path="/pregnancy" element={<Pregnancy />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/tips" element={<Layout><HealthTips /></Layout>} />
        <Route path="/ai" element={<Layout><AiAssistant /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
