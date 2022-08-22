import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { checkAuthAction, fetchCommentsAction, fetchFavoritesHotelsAction, fetchHotelAction, fetchHotelsAction, fetchHotelStatusFavoriteAction, fetchNearbyHotelsAction, fetchNewCommentAction, loginAction, logoutAction } from './api-actions';
import { APIRoute } from '../../consts/api-route';
import { createAPI } from '../api';
import { State } from '../../types/state';
import { AuthData } from '../../types/auth-data';
import { redirectToRoute } from './action';
import { makeFakeComment, makeFakeHotel } from '../../utils/mock';

describe('Async actions', () => {
  const api = createAPI();
  const extra = { api };
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(extra)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof extra, Action>
  >(middlewares);

  describe('Authorization actions', () => {

    it('should authorization status is «auth» when server return 200', async () => {
      const store = mockStore();

      mockAPI
        .onGet(APIRoute.Login)
        .reply(200, []);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(checkAuthAction());

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type
      ]);
    });

    it('should dispatch loginAction and RedirectToRoute when POST /login', async () => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
      const store = mockStore();

      mockAPI
        .onPost(APIRoute.Login)
        .reply(200, { token: 'secret' });

      Storage.prototype.setItem = jest.fn();

      await store.dispatch(loginAction(fakeUser));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type
      ]);

      expect(Storage.prototype.setItem).toBeCalledTimes(1);
      expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secret');
    });

    it('should dispatch Logout when Delete /logout', async () => {
      mockAPI
        .onDelete(APIRoute.Logout)
        .reply(204);

      const store = mockStore();
      Storage.prototype.removeItem = jest.fn();

      await store.dispatch(logoutAction());

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        logoutAction.pending.type,
        redirectToRoute.type,
        logoutAction.fulfilled.type
      ]);

      expect(Storage.prototype.removeItem).toBeCalledTimes(1);
      expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
    });
  });

  describe('Hotels actions', () => {
    const mockHotels = [makeFakeHotel(), makeFakeHotel()];
    const mockHotel = makeFakeHotel();

    it('should dispatch fetchHotelsAction when GET /hotels', async () => {

      mockAPI
        .onGet(APIRoute.Hotels)
        .reply(200, mockHotels);

      const store = mockStore();

      await store.dispatch(fetchHotelsAction());

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        fetchHotelsAction.pending.type,
        fetchHotelsAction.fulfilled.type
      ]);
    });

    it('should dispatch fetchHotelAction when GET /hotel/hotelId', async () => {

      mockAPI
        .onGet(`${APIRoute.Hotels}/${mockHotel.id}`)
        .reply(200, mockHotel);

      const store = mockStore();

      await store.dispatch(fetchHotelAction({ hotelId: mockHotel.id }));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        fetchHotelAction.pending.type,
        fetchHotelAction.fulfilled.type
      ]);
    });

    it('should dispatch fetchNearbyHotelsAction when GET /hotels/hotelId/nearby', async () => {

      mockAPI
        .onGet(`${APIRoute.Hotels}/${mockHotel.id}/nearby`)
        .reply(200, mockHotels);

      const store = mockStore();

      await store.dispatch(fetchNearbyHotelsAction({ hotelId: mockHotel.id }));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        fetchNearbyHotelsAction.pending.type,
        fetchNearbyHotelsAction.fulfilled.type
      ]);
    });

    it('should dispatch fetchFavoritesHotelsAction when GET /favorite', async () => {

      mockAPI
        .onGet(APIRoute.Favorite)
        .reply(200, mockHotels);

      const store = mockStore();

      await store.dispatch(fetchFavoritesHotelsAction());

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        fetchFavoritesHotelsAction.pending.type,
        fetchFavoritesHotelsAction.fulfilled.type
      ]);
    });

    it('should dispatch fetchHotelStatusFavoriteAction when POST /favorite/hotelId/status', async () => {

      const status = mockHotel.isFavorite === true ? 1 : 0;
      mockAPI
        .onPost(`${APIRoute.Favorite}/${mockHotel.id}/${status}`)
        .reply(200, {
          token: 'secret',
          hotel: mockHotel
        });

      const store = mockStore({
        DATA_HOTELS: {}
      });

      await store.dispatch(fetchHotelStatusFavoriteAction({ hotelId: mockHotel.id, status }));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        fetchHotelStatusFavoriteAction.pending.type,
        fetchHotelsAction.pending.type,
        fetchFavoritesHotelsAction.pending.type,
        fetchHotelStatusFavoriteAction.fulfilled.type
      ]);
    });

  });

  describe('Comments actions', () => {

    const mockComments = [makeFakeComment(), makeFakeComment()];
    const mockHotel = makeFakeHotel();

    it('should dispatch fetchCommentsAction when GET /comments/hotelId', async () => {

      mockAPI
        .onGet(`${APIRoute.Comments}/${mockHotel.id}`)
        .reply(200, mockComments);

      const store = mockStore();

      await store.dispatch(fetchCommentsAction({ hotelId: mockHotel.id }));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.fulfilled.type
      ]);
    });

    it('should dispatch fetchNewCommentAction and when POST /comments/ hotelId', async () => {
      mockAPI
        .onPost(`${APIRoute.Comments}/${mockHotel.id}`)
        .reply(200,
          {
            token: 'secret',
            comments: mockComments
          });

      const store = mockStore();

      await store.dispatch(fetchNewCommentAction({ comment: mockComments[0].comment, rating: mockComments[0].rating, hotelId: mockHotel.id }));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        fetchNewCommentAction.pending.type,
        fetchCommentsAction.pending.type,
        fetchNewCommentAction.fulfilled.type,
      ]);
    });

  });

});
