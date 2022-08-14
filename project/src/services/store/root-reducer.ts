import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts/api-route';
import { cityData } from './slices/city-data/city-data';
import { commentsData } from './slices/comments-data/comments-data';
import { favoritesHotelsData } from './slices/favorites-hotels-data/favorites-hotels-data';
import { hotelsData } from './slices/hotels-data/hotels-data';
import { userProcess } from './slices/user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.DataCity]: cityData.reducer,
  [NameSpace.DataComments]: commentsData.reducer,
  [NameSpace.DataFavoritesHotels]: favoritesHotelsData.reducer,
  [NameSpace.DataHotels]: hotelsData.reducer,
  [NameSpace.User]: userProcess.reducer,
});
