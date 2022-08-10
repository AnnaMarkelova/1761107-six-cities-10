import { Hotel } from '../types/hotel';
import { City } from '../types/city';
import { SortType } from '../consts/sort-type';

export const getHotelsByCity = (hotels: Hotel[], city: City) => hotels.filter((item: Hotel) => item.city.name === city.name);

export const getHotelById = (hotels: Hotel[], id: number) => hotels.find((item: Hotel) => item.id === id);

export const sortHotels = [
  {
    sortType: SortType.POPULAR,
    getSortHotels: (hotels: Hotel[]) => hotels
  },
  {
    sortType: SortType.LOW_TO_HIGH,
    getSortHotels: (hotels: Hotel[]) => hotels.slice().sort((hotelA, hotelB) => hotelA.price - hotelB.price)
  },
  {
    sortType: SortType.HIGH_TO_LOW,
    getSortHotels: (hotels: Hotel[]) => hotels.slice().sort((hotelA, hotelB) => hotelB.price - hotelA.price)
  },
  {
    sortType: SortType.TOP_RATED,
    getSortHotels: (hotels: Hotel[]) => hotels.slice().sort((hotelA, hotelB) => hotelB.rating - hotelA.rating)
  },
];
