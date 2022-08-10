import { LoginScreen } from '../../pages/login-screen/login-screen';
import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MainScreen } from '../../pages/main-screen/main-screen';
import { FavoritesScreen } from '../../pages/favorites-screen/favorites-screen';
import { PropertyScreen } from '../../pages/property-screen/property-screen';
import { NotFoundScreen } from '../../pages/not-found-screen/not-found-screen';
import { PrivateRoute } from '../private-route/pravate-route';
import { AppRoute } from '../../consts/app-route';
import { AuthorizationStatus } from '../../consts/authorization-status';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { LoaderThreeDots } from '../loader/loader';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../services/browser-history';
import { checkAuthAction } from '../../services/store/api-actions';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App: React.FunctionComponent = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  const { authorizationStatus } = useAppSelector((state) => state);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return (
      <LoaderThreeDots />
    );
  }

  return (
    <HistoryRouter
      history={browserHistory}
    >
      <ScrollToTop />
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            < MainScreen />
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              < FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Room}/:id`}
          element={
            < PropertyScreen />
          }
        />
        <Route
          path={AppRoute.Login}
          element={
            < LoginScreen />
          }
        />
        <Route
          path="*"
          element={
            <NotFoundScreen />
          }
        />
      </Routes>
    </HistoryRouter>
  );
};

export default App;
