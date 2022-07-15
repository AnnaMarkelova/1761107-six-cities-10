import { LoginScreen } from '../../pages/login-screen/login-screen';
import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { MainScreen } from '../../pages/main-screen/main-screen';
import { FavoritesScreen } from '../../pages/favorites-screen/favorites-screen';
import { getComments } from '../../mock/comments';
import { PropertyScreen } from '../../pages/property-screen/property-screen';
import { Hotel } from '../../types/hotel';
import { User } from '../../types/user';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import { NotFoundScreen } from '../../pages/not-found-screen/not-found-screen';
import { PrivateRoute } from '../private-route/pravate-route';

type MainScreenProps = {
  currentCity: string;
  currentSort: string;
  hotels: Hotel[];
  favoritesHotels: Hotel[];
  user: User;
}

const App: React.FunctionComponent<MainScreenProps> = ({ currentCity, currentSort, hotels, favoritesHotels, user }) => (
  <BrowserRouter>
    <Routes>
      <Route
        path={AppRoute.Main}
        element={
          < MainScreen
            currentCity={currentCity}
            currentSort={currentSort}
            hotels={hotels}
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
            hotelId={1}
            user={user}
            comments={getComments()}
            favoritesHotelsCount={favoritesHotels.length}
            nearHotels={[hotels[1], hotels[2], hotels[3]]}
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
