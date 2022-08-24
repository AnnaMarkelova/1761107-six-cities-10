import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '../../components/history-route/history-route';
import { AuthorizationStatus } from '../../consts/authorization-status';
import { Cities } from '../../consts/cities';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { makeFakeComment, makeFakeHotel } from '../../utils/mock';
import { PropertyScreen } from './property-screen';

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

describe('Page: PropertyScreen', () => {

  const store = mockStore({
    ROOT: {
      authorizationStatus: AuthorizationStatus.Auth
    },
    DATA_CITY: {
      city: Cities[0],
    },
    DATA_FAVORITES_HOTELS: {
      favoritesHotels: hotels,
    },
    DATA_HOTELS: {
      currentHotel: hotels[0],
      nearbyHotels: [hotels[1]],
    },
    DATA_COMMENTS: {
      comments: [makeFakeComment(), makeFakeComment()]
    }
  });

  const fakeComponent =
    (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PropertyScreen />
        </HistoryRouter>
      </Provider>
    );

  it('should render correctly', () => {
    render(fakeComponent);

    expect(screen.getByTestId('ThreeDots')).toBeInTheDocument();
  });

});
