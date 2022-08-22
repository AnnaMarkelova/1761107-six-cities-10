import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { internet } from 'faker';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '../../components/history-route/history-route';
import { AuthorizationStatus } from '../../consts/authorization-status';
import { createAPI } from '../../services/api';
import { loginAction } from '../../services/store/api-actions';
import { State } from '../../types/state';
import { makeFakeHotel } from '../../utils/mock';
import { LoginScreen } from './login-screen';

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

describe('Page: LoginScreen', () => {

  const store = mockStore({
    ROOT: {
      authorizationStatus: AuthorizationStatus.NoAuth
    },
    DATA_FAVORITES_HOTELS: {
      favoritesHotels: hotels
    }
  });

  const fakeComponent =
    (
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginScreen />
        </HistoryRouter>
      </Provider>
    );

  it('should render correctly', () => {
    render(fakeComponent);

    expect(screen.getByLabelText(/mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('should update Form data when user clicks on Submit', async () => {
    render(fakeComponent);

    const login = internet.email();
    const emailInput = screen.getByTestId('emailInput');
    fireEvent.change(emailInput, { target: { value: login } });

    const password = '12345';
    const passwordInput = screen.getByTestId('passwordInput');
    fireEvent.change(passwordInput, { target: { value: password } });

    await fireEvent.submit(screen.getByTestId('onClickSubmit'));


    const action = store.getActions().pop();

    expect(action?.type).toEqual(loginAction.pending.type);
    // expect((action as any)?.meta?.arg).toEqual({
    //   login: login,
    //   password: password,
    // });
  });

});
