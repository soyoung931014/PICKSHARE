import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import { lazy, Suspense } from 'react';
const MyPage = lazy(() => import('./component/MyPage/MyPage'));
const Login = lazy(() => import('./component/User/Login/Login'));
const Signup = lazy(() => import('./component/User/Signup/Signup'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const MainFeed = lazy(() => import('./pages/MainFeed'));
const UserFeed = lazy(() => import('./pages/UserFeed'));
const ErrorLoadingPage = lazy(() => import('./pages/ErrorLoadingPage'));
const KakaoLoading = lazy(() => import('./pages/KakaoLoading'));

function App() {
  const renderLoader = () => <div>로딩중</div>;
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Suspense fallback={renderLoader()}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/*  <Route path="/diary" element={<DiaryPage />} /> */}
          <Route path="/mainfeed" element={<MainFeed />} />
          <Route path="/feed/:nickname" element={<UserFeed />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/loading" element={<KakaoLoading />} />
          <Route path="/errorloading" element={<ErrorLoadingPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
