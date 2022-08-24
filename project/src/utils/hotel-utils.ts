import { Hotel } from '../types/hotel';
import { City } from '../types/city';
import { SortType } from '../consts/sort-type';

export const getHotelsByCity = (hotels: Hotel[], city: City) => hotels.filter((item: Hotel) => item.city.name === city.name);

export const getHotelById = (hotels: Hotel[], id: number) => hotels.find((item: Hotel) => item.id === id);

export const sortHotels = [
  {
    sortType: SortType.Popular,
    getSortHotels: (hotels: Hotel[]) => hotels
  },
  {
    sortType: SortType.LowToHigh,
    getSortHotels: (hotels: Hotel[]) => hotels.slice().sort((hotelA, hotelB) => hotelA.price - hotelB.price)
  },
  {
    sortType: SortType.HighToLow,
    getSortHotels: (hotels: Hotel[]) => hotels.slice().sort((hotelA, hotelB) => hotelB.price - hotelA.price)
  },
  {
    sortType: SortType.TopRated,
    getSortHotels: (hotels: Hotel[]) => hotels.slice().sort((hotelA, hotelB) => hotelB.rating - hotelA.rating)
  },
];
