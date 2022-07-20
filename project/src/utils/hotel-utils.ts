import { getHotels } from '../mock/hotels';
import { City, Hotel } from '../types/hotel';

const hotels = getHotels();

export const getHotelsByCity = (city: City) => hotels.filter((item: Hotel) => item.city.name === city.name);

export const getHotelById = (id: number) => hotels.find((item: Hotel) => item.id === id);

export const getFavoriteHotels = () => hotels.filter((item: Hotel) => item.isFavorite);
