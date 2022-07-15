export const cities: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const sortType: {[type: string]: string} = {
  POPULAR: 'Popular',
  LOW_TO_HIGH: 'Price: low to high',
  HIGH_TO_LOW: 'Price: high to low',
  TOP_RATED: 'Top rated first',
};

export const cityCardType: {[type: string]: string} = {
  CITIES_CARD: 'cities__card',
  FAVORITES_CARD: 'favorites__card',
};

export const hotelType: {[type: string]: string} = {
  apartment: 'Apartment',
  room: 'Private Room',
  house: 'House',
  hotel: 'Hotel',
};

export enum AppRoute {
Main = '/',
Login = '/login',
Favorites = '/favorites',
Room = '/offer'
}
