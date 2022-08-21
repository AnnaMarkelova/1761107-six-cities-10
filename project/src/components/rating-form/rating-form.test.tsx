import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import HistoryRouter from '../history-route/history-route';
import { RatingForm } from './rating-form';

const api = createAPI();
const extra = { api };
const middlewares = [thunk.withExtraArgument(extra)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof extra, Action>
>(middlewares);

const history = createMemoryHistory();

describe('Component: RatingForm', () => {

  const store = mockStore({
    ROOT: {
      isDataLoading: false,
    }
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <RatingForm
            value={5}
            onChange={jest.fn()}
          />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('rootElement')).toBeInTheDocument();
  });
});
