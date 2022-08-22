import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AuthorizationStatus } from '../../consts/authorization-status';
import { SortType } from '../../consts/sort-type';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { makeFakeHotel, makeFakeUser } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import CitiesPlaces from './cities-places';

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

describe('Component: CitiesPlaces', () => {

  describe('Component with hotels', () => {

    const store = mockStore({
      DATA_CITY: {
        city: hotels[0].city,
      },
      DATA_HOTELS: {
        hotels
      },
      ROOT: {
        user: makeFakeUser(),
        authorizationStatus: AuthorizationStatus.Auth
      }
    });

    const fakeComponent =
      (
        <Provider store={store}>
          <HistoryRouter history={history}>
            <CitiesPlaces
              onListItemHover={jest.fn()}
            />
          </HistoryRouter>
        </Provider>
      );

    it('should render correctly', () => {
      render(fakeComponent);

      expect(screen.getByText(/places to stay in/i)).toBeInTheDocument();
    });

    it('should set active Sort when user clicks on Sort', async () => {
      render(fakeComponent);

      const topRatedSort = screen.getByTestId(`onClickSort_${SortType.TOP_RATED}`);
      await userEvent.click(topRatedSort);

      expect(screen.getByTestId(`onClickSort_${SortType.TOP_RATED}`).classList.contains('places__option--active')).toBe(true);

    });

  });

  describe('Component without hotels', () => {

    const store = mockStore({
      DATA_CITY: {
        city: hotels[0].city,
      },
      DATA_HOTELS: {
        hotels: [],
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
            <CitiesPlaces
              onListItemHover={jest.fn()}
            />
          </HistoryRouter>
        </Provider>,
      );

      expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
      expect(screen.getByText(/We could not find any property available at the moment/i)).toBeInTheDocument();
    });

  });
});
