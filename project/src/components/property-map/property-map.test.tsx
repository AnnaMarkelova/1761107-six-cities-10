import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { makeFakeHotel } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import { PropertyMap } from './property-map';

const api = createAPI();
const extra = { api };
const middlewares = [thunk.withExtraArgument(extra)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof extra, Action>
>(middlewares);

const history = createMemoryHistory();

describe('Component: PropertyMap', () => {

  const nearbyHotels = [makeFakeHotel()];
  const store = mockStore({
    DATA_CITY: {
      city: nearbyHotels[0].city
    },
    DATA_HOTELS: {
      nearbyHotels,
      currentHotel: makeFakeHotel(),
    }
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PropertyMap />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('rootElementPropertyMap')).toBeInTheDocument();
  });
});
