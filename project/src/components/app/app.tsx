import { LoginScreen } from '../../pages/login-screen/login-screen';
import React, { useEffect } from 'react';
import { Route, BrowserRouter, Routes, useLocation } from 'react-router-dom';
import { MainScreen } from '../../pages/main-screen/main-screen';
import { FavoritesScreen } from '../../pages/favorites-screen/favorites-screen';
import { getComments } from '../../mock/comments';
import { PropertyScreen } from '../../pages/property-screen/property-screen';
import { Hotel } from '../../types/hotel';
import { User } from '../../types/user';
import { NotFoundScreen } from '../../pages/not-found-screen/not-found-screen';
import { PrivateRoute } from '../private-route/pravate-route';
import { AppRoute } from '../../consts/app-route';
import { AuthorizationStatus } from '../../consts/authorization-status';

type MainScreenProps = {
  currentSort: string;
  favoritesHotels: Hotel[];
  user: User;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App: React.FunctionComponent<MainScreenProps> = ({ currentSort, favoritesHotels, user }) => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route
        path={AppRoute.Main}
        element={
          < MainScreen
            currentSort={currentSort}
            favoritesHotelsCount={favoritesHotels.length}
            user={user}
          />
        }
      />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute
            authorizationStatus={AuthorizationStatus.Auth}
          >
            < FavoritesScreen
              favoritesHotels={favoritesHotels}
              user={user}
            />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.Room}/:id`}
        element={
          < PropertyScreen
            user={user}
            comments={getComments()}
            favoritesHotelsCount={favoritesHotels.length}
          />
        }
      />
      <Route
        path={AppRoute.Login}
        element={
          < LoginScreen
            favoritesHotelsCount={favoritesHotels.length}
          />
        }
      />
      <Route
        path="*"
        element={
          <NotFoundScreen />
        }
      />
    </Routes>
  </BrowserRouter>

);

export default App;
