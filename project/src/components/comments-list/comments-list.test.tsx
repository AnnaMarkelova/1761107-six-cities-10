import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AuthorizationStatus } from '../../consts/authorization-status';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { makeFakeComment, makeFakeHotel } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import { CommentsList } from './comments-list';

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
  DATA_CITY: {
    city: hotels[0].city,
  },
  DATA_HOTELS: {
    hotels,
    currentHotel: hotels[0]
  },
  ROOT: {
    authorizationStatus: AuthorizationStatus.Auth
  },
  DATA_COMMENTS: {
    comments: [makeFakeComment(), makeFakeComment()]
  }
});

describe('Component: CommentsList', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CommentsList/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });

});
