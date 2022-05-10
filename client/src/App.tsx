import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './component/User/Signup/Signup';
import GlobalStyles from './GlobalStyles';
import DiaryPage from './pages/DiaryPage';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/diary" element={<DiaryPage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
