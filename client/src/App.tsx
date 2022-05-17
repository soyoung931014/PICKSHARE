import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './component/User/Login/Login';
import Signup from './component/User/Signup/Signup';
import GlobalStyles from './GlobalStyles';
// import DiaryPage from './pages/DiaryPage';
import LandingPage from './pages/LandingPage';
import MainFeed from './pages/MainFeed';
import UserFeed from './pages/UserFeed';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/*  <Route path="/diary" element={<DiaryPage />} /> */}
        <Route path="/mainfeed" element={<MainFeed />} />
        <Route path="/feed/:id" element={<UserFeed />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
