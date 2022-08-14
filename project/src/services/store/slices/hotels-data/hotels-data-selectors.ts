import { NameSpace } from '../../../../consts/api-route';
import { Hotel } from '../../../../types/hotel';
import { State } from '../../../../types/state';

export const getCurrentHotel = (state: State): Hotel | null => state[NameSpace.DataHotels].currentHotel;
export const getHotels = (state: State): Hotel[] => state[NameSpace.DataHotels].hotels;
export const getNearbyHotels = (state: State): Hotel[] => state[NameSpace.DataHotels].nearbyHotels;
export const getIsDataLoading = (state: State): boolean => state[NameSpace.DataHotels].isDataLoading;
