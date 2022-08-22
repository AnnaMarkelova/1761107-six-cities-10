import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '../../components/history-route/history-route';
import { AuthorizationStatus } from '../../consts/authorization-status';
import { createAPI } from '../../services/api';
import { fetchHotelStatusFavoriteAction } from '../../services/store/api-actions';
import { State } from '../../types/state';
import { makeFakeHotel } from '../../utils/mock';
import { PropertyTitleBlock } from './propperty-title-block';

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

describe('Component: PropertyTitleBlock', () => {

  const store = mockStore({
    ROOT: {
      authorizationStatus: AuthorizationStatus.Auth
    },
    DATA_HOTELS: {
      currentHotel: hotels[0],
    },
  });

  const fakeComponent =
    (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PropertyTitleBlock />
        </HistoryRouter>
      </Provider>
    );

  it('should render correctly', () => {
    render(fakeComponent);

    expect(screen.getByText(/To bookmarks/i)).toBeInTheDocument();
  });

  it('should change favorite status', async () => {

    render(fakeComponent);

    await userEvent.click(screen.getByTestId('onClickStatusFavorite'));

    const actions = store.getActions().map(({ type }) => ({ type }));

    expect(actions).toEqual([
      { type: fetchHotelStatusFavoriteAction.pending.type }
    ]);
  });

});
