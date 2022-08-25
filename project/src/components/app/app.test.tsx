import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AppRoute } from '../../consts/app-route';
import { AuthorizationStatus } from '../../consts/authorization-status';
import { CITIES } from '../../consts/cities';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { makeFakeHotel } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import App from './app';

const api = createAPI();
const extra = { api };
const middlewares = [thunk.withExtraArgument(extra)];

global.scrollTo = jest.fn();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof extra, Action>
>(middlewares);

describe('Application Routing', () => {

  describe('Application Routing with Authorization', () => {

    const hotel = makeFakeHotel();
    const store = mockStore({
      ROOT: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      DATA_CITY: {
        city: CITIES[0],
      },
      DATA_HOTELS: {
        hotels: [],
        currentHotel: hotel,
        nearbyHotels: []
      },
      DATA_FAVORITES_HOTELS: {
        favoritesHotels: [makeFakeHotel()],
      },
      DATA_COMMENTS: {
        comments: []
      }

    });

    const history = createMemoryHistory();

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    it('should render "MainScreen" when user navigate to "/"', () => {
      history.push(AppRoute.Main);

      render(fakeApp);

      expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
      expect(screen.getByText(/We could not find any property available at the moment in/i)).toBeInTheDocument();
    });

    it('should render "FavoritesScreen" when user navigate to "/favorites"', () => {
      history.push(AppRoute.Favorites);

      render(fakeApp);
      expect(screen.getByText(/Rating/i)).toBeInTheDocument();
      expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    });

    it('should render "PropertyScreen" when user navigate to "/offer/id"', () => {
      history.push(`${AppRoute.Room}/${hotel.id}`);

      render(fakeApp);
      expect(screen.getByTestId('ThreeDots')).toBeInTheDocument();
    });

    it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
      history.push('/non-existent-route');

      render(fakeApp);

      expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
    });

  });

  describe('Application Routing without Authorization', () => {

    const store = mockStore({
      ROOT: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
      DATA_CITY: {
        city: CITIES[0],
      },
      DATA_HOTELS: {
        hotels: [],
      },
      DATA_FAVORITES_HOTELS: {
        favoritesHotels: [],
      }

    });

    const history = createMemoryHistory();

    const fakeApp = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </Provider>
    );

    it('should render "LoginScreen" when user navigate to "/login"', () => {
      history.push(AppRoute.Login);

      render(fakeApp);

      expect(screen.getByLabelText(/mail/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });
  });

});
