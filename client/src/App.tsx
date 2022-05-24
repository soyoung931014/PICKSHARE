import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyPage from './component/MyPage/MyPage';
import Login from './component/User/Login/Login';
import Signup from './component/User/Signup/Signup';
import GlobalStyles from './GlobalStyles';
// import DiaryPage from './pages/DiaryPage';
import LandingPage from './pages/LandingPage';
import Loading from './pages/Loading';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/*  <Route path="/diary" element={<DiaryPage />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
