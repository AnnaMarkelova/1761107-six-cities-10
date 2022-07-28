import { getHotels } from '../mock/hotels';
import { Hotel } from '../types/hotel';
import { City } from '../types/city';
import { sortType } from '../consts/sort-type';

const hotelsMock = getHotels();

export const getHotelsByCity = (city: City) => hotelsMock.filter((item: Hotel) => item.city.name === city.name);

export const getHotelById = (id: number) => hotelsMock.find((item: Hotel) => item.id === id);

export const getFavoriteHotels = () => hotelsMock.filter((item: Hotel) => item.isFavorite);

export const sortHotels = [
  {
    sortType: sortType.POPULAR,
    getSortHotels: (hotels: Hotel[]) => hotels
  },
  {
    sortType: sortType.LOW_TO_HIGH,
    getSortHotels: (hotels: Hotel[]) => hotels.slice().sort((hotelA, hotelB) => hotelA.price - hotelB.price)
  },
  {
    sortType: sortType.HIGH_TO_LOW,
    getSortHotels: (hotels: Hotel[]) => hotels.slice().sort((hotelA, hotelB) => hotelB.price - hotelA.price)
  },
  {
    sortType: sortType.TOP_RATED,
    getSortHotels: (hotels: Hotel[]) => hotels.slice().sort((hotelA, hotelB) => hotelB.rating - hotelA.rating)
  },
];
