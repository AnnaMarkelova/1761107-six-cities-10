import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AuthorizationStatus } from '../../consts/authorization-status';
import { SortType } from '../../consts/sort-type';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { makeFakeHotel, makeFakeUser } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import PlacesList from './places-list';

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

describe('Component: PlacesList', () => {

  const store = mockStore({
    DATA_CITY: {
      city: hotels[0].city,
    },
    DATA_HOTELS: {
      hotels,
      currentHotel: hotels[0]
    },
    ROOT: {
      user: makeFakeUser(),
      authorizationStatus: AuthorizationStatus.Auth
    }
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlacesList
            onListItemHover={jest.fn()}
            sort = {SortType.POPULAR}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('rootElementPlacesList')).toBeInTheDocument();
  });

});
