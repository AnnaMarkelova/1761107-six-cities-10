import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { fetchNewCommentAction } from '../../services/store/api-actions';
import { State } from '../../types/state';
import { makeFakeHotel } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import { CommentCardNew } from './comment-card-new';

const api = createAPI();
const extra = { api };
const middlewares = [thunk.withExtraArgument(extra)];

const hotel = makeFakeHotel();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof extra, Action>
>(middlewares);

const history = createMemoryHistory();


describe('Component: CommentCardNew', () => {

  const store = mockStore({
    DATA_HOTELS: {
      currentHotel: hotel
    },
    ROOT: {
      isDataLoading: true,
      dataSentSuccessfully: true,
    }
  });

  const fakeComponent =
    (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CommentCardNew />
        </HistoryRouter>
      </Provider>
    );

  it('should render correctly', () => {
    render(fakeComponent);

    expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();
  });


  it('should update Form data when user clicks on Submit', async () => {
    render(fakeComponent);

    const comment = screen.getByTestId('comment');
    fireEvent.change(comment, { target: { value: 'comment test' } });

    await fireEvent.submit(screen.getByTestId('onClickSubmit'));

    const action = store.getActions().pop();
    expect(action?.type).toEqual(fetchNewCommentAction.pending.type);
    expect((action as any)?.meta?.arg).toEqual({
      comment: 'comment test',
      hotelId: hotel.id,
      rating: 0,
    });
  });

});
