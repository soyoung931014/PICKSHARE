import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import { lazy, Suspense } from 'react';
import CommentSection from './component/Comment/Comments';

const MyPage = lazy(() => import('./component/MyPage/MyPage'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const MainFeed = lazy(() => import('./pages/MainFeed'));
const UserFeed = lazy(() => import('./pages/UserFeed'));
const ErrorLoadingPage = lazy(() => import('./pages/ErrorLoadingPage'));
const KakaoLoading = lazy(() => import('./pages/KakaoLoading'));
const DiaryPage = lazy(() => import('./pages/DiaryPage'));

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Suspense fallback={<div>로딩중</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/diary" element={<DiaryPage />} />
          <Route path="/mainfeed" element={<MainFeed />} />
          <Route path="/feed/:nickname" element={<UserFeed />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/loading" element={<KakaoLoading />} />
          <Route path="/errorloading" element={<ErrorLoadingPage />} />
          <Route path="/commentsection" element={<CommentSection />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
