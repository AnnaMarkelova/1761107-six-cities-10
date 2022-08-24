import { AuthorizationStatus } from '../../../../consts/authorization-status';
import { UserProcess } from '../../../../types/state';
import { checkAuthAction, fetchHotelAction, fetchHotelsAction, fetchHotelStatusFavoriteAction, fetchNearbyHotelsAction, fetchNewCommentAction, loginAction, logoutAction } from '../../api-actions';
import { root } from './root';

describe('Reducer: favoritesHotelsData', () => {

  let state: UserProcess;

  beforeEach(() => {
    state = {
      user: null,
      authorizationStatus: AuthorizationStatus.Unknown,
      isDataLoading: false,
      dataSentSuccessfully: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(root.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" and user by loaded data if checkAuthAction fulfilled', () => {
      expect(root.reducer(state, { type: checkAuthAction.fulfilled.type }))
        .toEqual({
          user: undefined,
          authorizationStatus: AuthorizationStatus.Auth,
          isDataLoading: false,
          dataSentSuccessfully: false,
        });
    });
    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(root.reducer(state, { type: checkAuthAction.rejected.type }))
        .toEqual({
          user: null,
          authorizationStatus: AuthorizationStatus.NoAuth,
          isDataLoading: false,
          dataSentSuccessfully: false,
        });
    });
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to "AUTH" and user by loaded data if loginAction fulfilled', () => {
      expect(root.reducer(state, { type: loginAction.fulfilled.type }))
        .toEqual({
          user: undefined,
          authorizationStatus: AuthorizationStatus.Auth,
          isDataLoading: false,
          dataSentSuccessfully: false,
        });
    });
    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(root.reducer(state, { type: loginAction.rejected.type }))
        .toEqual({
          user: null,
          authorizationStatus: AuthorizationStatus.NoAuth,
          isDataLoading: false,
          dataSentSuccessfully: false,
        });
    });
  });

  describe('logoutAction test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(root.reducer(state, { type: logoutAction.fulfilled.type }))
        .toEqual({
          user: null,
          authorizationStatus: AuthorizationStatus.NoAuth,
          isDataLoading: false,
          dataSentSuccessfully: false,
        });
    });
  });

  describe('isDataLoading and dataSentSuccessfully test', () => {

    describe('fetchHotelsAction test', () => {

      it('should update isDataLoading if fetchHotelsAction pending', () => {
        expect(root.reducer(state, { type: fetchHotelsAction.pending.type }))
          .toEqual({
            user: null,
            authorizationStatus: AuthorizationStatus.Unknown,
            isDataLoading: true,
            dataSentSuccessfully: false,
          });
      });

      it('should update isDataLoading if fetchHotelsAction fulfilled', () => {
        expect(root.reducer(state, { type: fetchHotelsAction.fulfilled.type }))
          .toEqual(state);
      });

      it('should update isDataLoading if fetchHotelsAction rejected', () => {
        expect(root.reducer(state, { type: fetchHotelsAction.rejected.type }))
          .toEqual(state);
      });

    });

    describe('fetchHotelAction test', () => {

      it('should update isDataLoading if fetchHotelAction pending', () => {
        expect(root.reducer(state, { type: fetchHotelAction.pending.type }))
          .toEqual({
            user: null,
            authorizationStatus: AuthorizationStatus.Unknown,
            isDataLoading: true,
            dataSentSuccessfully: false,
          });
      });

      it('should update isDataLoading if fetchHotelAction fulfilled', () => {
        expect(root.reducer(state, { type: fetchHotelAction.fulfilled.type }))
          .toEqual(state);
      });

      it('should update isDataLoading if fetchHotelAction rejected', () => {
        expect(root.reducer(state, { type: fetchHotelAction.rejected.type }))
          .toEqual(state);
      });
    });

    describe('fetchNearbyHotelsAction test', () => {

      it('should update isDataLoading if fetchNearbyHotelsAction pending', () => {
        expect(root.reducer(state, { type: fetchNearbyHotelsAction.pending.type }))
          .toEqual({
            user: null,
            authorizationStatus: AuthorizationStatus.Unknown,
            isDataLoading: true,
            dataSentSuccessfully: false,
          });
      });

      it('should update isDataLoading if fetchNearbyHotelsAction fulfilled', () => {
        expect(root.reducer(state, { type: fetchNearbyHotelsAction.fulfilled.type }))
          .toEqual(state);
      });

      it('should update isDataLoading if fetchNearbyHotelsAction rejected', () => {
        expect(root.reducer(state, { type: fetchNearbyHotelsAction.rejected.type }))
          .toEqual(state);
      });
    });

    describe('fetchHotelStatusFavoriteAction test', () => {

      it('should update isDataLoading if fetchHotelStatusFavoriteAction pending', () => {
        expect(root.reducer(state, { type: fetchHotelStatusFavoriteAction.pending.type }))
          .toEqual({
            user: null,
            authorizationStatus: AuthorizationStatus.Unknown,
            isDataLoading: true,
            dataSentSuccessfully: false,
          });
      });

      it('should update isDataLoading if fetchHotelStatusFavoriteAction fulfilled', () => {
        expect(root.reducer(state, { type: fetchHotelStatusFavoriteAction.fulfilled.type }))
          .toEqual(state);
      });

      it('should update isDataLoading if fetchHotelStatusFavoriteAction rejected', () => {
        expect(root.reducer(state, { type: fetchHotelStatusFavoriteAction.rejected.type }))
          .toEqual(state);
      });
    });

    describe('fetchNewCommentAction test', () => {

      it('should update isDataLoading if fetchNewCommentAction pending', () => {
        expect(root.reducer(state, { type: fetchNewCommentAction.pending.type }))
          .toEqual({
            user: null,
            authorizationStatus: AuthorizationStatus.Unknown,
            isDataLoading: true,
            dataSentSuccessfully: false,
          });
      });

      it('should update isDataLoading and dataSentSuccessfully if fetchNewCommentAction fulfilled', () => {
        expect(root.reducer(state, { type: fetchNewCommentAction.fulfilled.type }))
          .toEqual({
            user: null,
            authorizationStatus: AuthorizationStatus.Unknown,
            isDataLoading: false,
            dataSentSuccessfully: true,
          });
      });

      it('should update isDataLoading and dataSentSuccessfully if fetchNewCommentAction rejected', () => {
        expect(root.reducer(state, { type: fetchNewCommentAction.rejected.type }))
          .toEqual(state);
      });
    });
  });
});
