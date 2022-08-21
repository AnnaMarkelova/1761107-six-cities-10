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
import { Map } from './map';

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
      currentHotel: hotels[0]
    },
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Map
            hotels={hotels}
            selectedHotel={hotels[0]}
            style={{
              height: '579px',
              width: '1146px',
              margin: '0 auto',
            }}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('rootElementMap')).toBeInTheDocument();
  });


});
