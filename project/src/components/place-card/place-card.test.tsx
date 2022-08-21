import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AuthorizationStatus } from '../../consts/authorization-status';
import { cityCardType } from '../../consts/city-card-type';
import { createAPI } from '../../services/api';
import { fetchHotelStatusFavoriteAction } from '../../services/store/api-actions';
import { State } from '../../types/state';
import { makeFakeHotel } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import PlaceCard from './place-card';

const api = createAPI();
const extra = { api };
const middlewares = [thunk.withExtraArgument(extra)];

global.scrollTo = jest.fn();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof extra, Action>
>(middlewares);

const hotel = makeFakeHotel();

describe('Component: PlaceCard', () => {

  describe('Component with Authorization', () => {

    const store = mockStore({
      ROOT: {
        authorizationStatus: AuthorizationStatus.Auth,
        isDataLoading: false
      },
    });

    const history = createMemoryHistory();

    const fakeComponent = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlaceCard
            hotel={hotel}
            cardType={cityCardType.FAVORITES_CARD}
          />
        </HistoryRouter>
      </Provider>
    );

    it('should render correctly', () => {
      render(fakeComponent);

      expect(screen.getByText(/To bookmarks/i)).toBeInTheDocument();
    });

    it('should change favorite status', async () => {

      render(fakeComponent);

      await userEvent.click(screen.getByTestId('onClickStatusFavorite'));

      const actions = store.getActions().map(({ type }) => ({ type }));

      expect(actions).toEqual([
        { type: fetchHotelStatusFavoriteAction.pending.type }
      ]);
    });

    it('should navigate to "/offer/id"', async () => {
      render(fakeComponent);
      await userEvent.click(screen.getByTestId('onClickCard'));
      // expect(screen.getText(/What's inside/i)).toBeInTheDocument();
    });
  });

  describe('Component without Authorization', () => {

    const store = mockStore({
      ROOT: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        isDataLoading: false
      },
    });

    const history = createMemoryHistory();

    const fakeComponent = (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlaceCard
            hotel={hotel}
            cardType={cityCardType.FAVORITES_CARD}
          />
        </HistoryRouter>
      </Provider>
    );

    it('should navigate to "/login"', async () => {

      render(fakeComponent);

      await userEvent.click(screen.getByTestId('onClickStatusFavorite'));

      // history.push(AppRoute.Login);

      // render(fakeComponent);

      // expect(screen.getByLabelText(/mail/i)).toBeInTheDocument();
      // expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    });
  });
});

