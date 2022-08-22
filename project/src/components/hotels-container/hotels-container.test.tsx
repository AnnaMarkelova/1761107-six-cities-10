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
import { HotelsContainer } from './hotels-container';

const api = createAPI();
const extra = { api };
const middlewares = [thunk.withExtraArgument(extra)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof extra, Action>
>(middlewares);

const history = createMemoryHistory();

describe('Component: HotelsContainer', () => {

  const hotels = [makeFakeHotel()];

  const store = mockStore({
    ROOT: {
      authorizationStatus: AuthorizationStatus.Auth,
    },
    DATA_CITY: {
      city: hotels[0].city
    },
    DATA_HOTELS: {
      hotels,
    }
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HotelsContainer/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('rootElementHotelsContainer')).toBeInTheDocument();
  });
});
