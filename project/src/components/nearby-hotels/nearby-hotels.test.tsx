import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AuthorizationStatus } from '../../consts/authorization-status';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { makeFakeHotel } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import { NearbyHotels } from './nearby-hotels';

const api = createAPI();
const extra = { api };
const middlewares = [thunk.withExtraArgument(extra)];

const hotels = [makeFakeHotel(), makeFakeHotel(), makeFakeHotel()];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof extra, Action>
>(middlewares);

const history = createMemoryHistory();

const store = mockStore({
  ROOT: {
    authorizationStatus: AuthorizationStatus.Auth
  },
  DATA_HOTELS: {
    nearbyHotels: hotels
  },
});

describe('Component: NearbyHotels', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NearbyHotels/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

});
