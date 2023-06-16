import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import PostPage from "../../container/pages/PostPage";
import BoardDetail from "../../container/pages/boardDetail";
import BoardRegister from "../../container/pages/boardRegister";
import Auth from '../auth';

const Plogging = lazy(() => import('../../container/pages/plogging'));
const Index = lazy(() => import('../../container/pages/index'));
const Board = lazy(() => import('../../container/pages/board'));
const Challenge = lazy(() => import('../../container/pages/challenge'));
const Profile = lazy(() => import('../../container/pages/profile'));
const Friend = lazy(() => import('../../container/pages/friends'));
const Reward = lazy(() => import('../../container/pages/reward'));
const Admin = lazy(() => import('../../container/pages/admin'));
const Register = lazy(() => import('../../container/pages/boardRegister'));
// const ChallengeCreate = lazy(() => import('../../container/pages/ChallengeCreate'));

function PagesRoute() {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="plogging" element={<Plogging />} />
      <Route path="board/register" element={<BoardRegister />} />
      <Route path="board/:bno" element={<BoardDetail />} />
      <Route path="board" element={<Board />} />
      <Route path="challenge" element={<Challenge />} />
      <Route path="profile" element={<Profile />} />
      {/* <Route path="/profile/" element={<Profile />} /> */}
      <Route path="member/*" element={<Auth />} />
      <Route path="friend" element={<Friend />} />
      <Route path="reward" element={<Reward />} />
      <Route path=":username" element={<PostPage />} />
      <Route path="admin" element={<Admin />} />
      {/* <Route path="callengeCreate" element={<ChallengeCreate />} /> */}
    </Routes>
  );
}

export default PagesRoute;
