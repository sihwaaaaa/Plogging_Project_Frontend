import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Plogging = lazy(() => import('../../container/pages/plogging'));
const Index = lazy(() => import('../../container/pages/index'));
const Board = lazy(() => import('../../container/pages/board'));
const Challenge = lazy(() => import('../../container/pages/challenge'));
const Profile = lazy(() => import('../../container/pages/profile'));
const Friend = lazy(() => import('../../container/pages/friend'));
const Reward = lazy(() => import('../../container/pages/reward'));

function PagesRoute() {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="plogging" element={<Plogging />} />
      <Route path="board" element={<Board />} />
      <Route path="challenge" element={<Challenge />} />
      <Route path="profile" element={<Profile />} />
      <Route path="friend" element={<Friend />} />
      <Route path="reward" element={<Reward />} />
    </Routes>
  );
}

export default PagesRoute;
