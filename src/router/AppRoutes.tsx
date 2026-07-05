import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Favorites from '../pages/Favorites/Favorites';
import Detail from '../pages/Detail/Detail';
import NotFound from '../pages/NotFound/NotFound';

import { ROUTES } from './paths';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.DETAIL} element={<Detail />} />
      <Route path={ROUTES.FAVORITES} element={<Favorites />} />

      {/* 404 */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
