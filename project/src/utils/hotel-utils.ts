import { getHotels } from '../mock/hotels';
import { Hotel } from '../types/hotel';

const hotels = getHotels();

export const getHotelsByCity = (city: string) => hotels.filter((item: Hotel) => item.city.name === city);

export const getHotelById = (id: number) => hotels.find((item: Hotel) => item.id === id);

export const getFavoriteHotels = () => hotels.filter((item: Hotel) => item.isFavorite);
