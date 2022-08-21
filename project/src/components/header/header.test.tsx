import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AuthorizationStatus } from '../../consts/authorization-status';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { makeFakeHotel, makeFakeUser } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import { Header } from './header';

const api = createAPI();
const extra = { api };
const middlewares = [thunk.withExtraArgument(extra)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof extra, Action>
>(middlewares);

const history = createMemoryHistory();

describe('Component: Header', () => {

  describe('with Authorization', () => {

    const store = mockStore({
      ROOT: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: makeFakeUser(),
      },
      DATA_FAVORITES_HOTELS: {
        favoritesHotels: [makeFakeHotel()],
      },
    });

    const fakeHeader = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>
    );

    it('should render correctly', () => {
      render(fakeHeader);

      expect(screen.getByTestId('linktoMainPage')).toBeInTheDocument();
    });

    it('should redirect to main page when user clicked', async () => {
      render(fakeHeader);
      await userEvent.click(screen.getByTestId('linktoMainPage'));
      expect(screen.getByText(/Sign out/i)).toBeInTheDocument();

      await userEvent.click(screen.getByTestId('linktoFavotitePage'));
      expect(screen.getByText(/Sign out/i)).toBeInTheDocument();

      await userEvent.click(screen.getByTestId('linktoMainPageByLogout'));
      expect(screen.getByText(/Sign out/i)).toBeInTheDocument();

    });
  });

  describe('without Authorization', () => {

    const store = mockStore({
      ROOT: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
      DATA_FAVORITES_HOTELS: {
        favoritesHotels: [makeFakeHotel()],
      },
    });

    const fakeHeader = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>
    );

    it('should redirect to main page when user clicked to linktoLoginPage', async () => {
      render(fakeHeader);
      await userEvent.click(screen.getByTestId('linktoLoginPage'));
      expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    });
  });

});
