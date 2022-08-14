import { NameSpace } from '../../../../consts/api-route';
import { Hotel } from '../../../../types/hotel';
import { State } from '../../../../types/state';

export const getFavoritesHotels = (state: State): Hotel[] => state[NameSpace.DataFavoritesHotels].favoritesHotels;
export const getIsHotelStatusFavoriteLoading = (state: State): boolean => state[NameSpace.DataFavoritesHotels].isHotelStatusFavoriteLoading;
