import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { CITIES } from '../../consts/cities';
import { createAPI } from '../../services/api';
import { setCity } from '../../services/store/slices/city-data/city-data';
import { State } from '../../types/state';
import HistoryRouter from '../history-route/history-route';
import { CitiesList } from './cities-list';

const api = createAPI();
const extra = { api };
const middlewares = [thunk.withExtraArgument(extra)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof extra, Action>
>(middlewares);

const store = mockStore({
  DATA_CITY: {
    city: CITIES[0],
  },
});

const history = createMemoryHistory();

describe('Component: CitiesList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CitiesList />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(CITIES[0].name)).toBeInTheDocument();
    expect(screen.getByText(CITIES[1].name)).toBeInTheDocument();
    expect(screen.getByText(CITIES[2].name)).toBeInTheDocument();
  });

  it('should setCity when user clicks on City', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CitiesList />
        </HistoryRouter>
      </Provider>,
    );

    await userEvent.click(screen.getByTestId(`ClickOnCity${CITIES[1].name}`));

    const actions = store.getActions().map((item) => (item));

    expect(actions).toEqual([
      {
        type: setCity.type,
        payload: CITIES[1]
      },
    ]);
  });

});
