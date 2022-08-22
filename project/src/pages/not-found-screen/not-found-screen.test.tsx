import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '../../components/history-route/history-route';
import { AuthorizationStatus } from '../../consts/authorization-status';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { makeFakeHotel } from '../../utils/mock';
import { NotFoundScreen } from './not-found-screen';

const api = createAPI();
const extra = { api };
const middlewares = [thunk.withExtraArgument(extra)];

const hotels = [makeFakeHotel(), makeFakeHotel()];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof extra, Action>
>(middlewares);

const history = createMemoryHistory();

describe('Page: NotFoundScreen', () => {

  const store = mockStore({
    ROOT: {
      authorizationStatus: AuthorizationStatus.NoAuth
    },
    DATA_FAVORITES_HOTELS: {
      favoritesHotels: hotels
    }
  });

  const fakeComponent =
    (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NotFoundScreen />
        </HistoryRouter>
      </Provider>
    );

  it('should render correctly', () => {
    render(fakeComponent);

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });

});
