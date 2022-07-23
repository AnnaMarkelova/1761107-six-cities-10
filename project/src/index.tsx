import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { cities } from './consts/cities';
import { sortType } from './consts/sort-type';
import { getUser } from './mock/user';
import { getFavoriteHotels, getHotelsByCity } from './utils/hotel-utils';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const Setting = {
  CURRENT_CITY: cities[3],
  CURRENT_SORT: sortType.POPULAR,
  hotels: getHotelsByCity(cities[3]),
  favoritesHotels: getFavoriteHotels(),
  user: getUser()
};

root.render(
  <React.StrictMode>
    <App
      currentCity={Setting.CURRENT_CITY}
      currentSort={Setting.CURRENT_SORT}
      hotels={Setting.hotels}
      favoritesHotels={Setting.favoritesHotels}
      user={Setting.user}
    />
  </React.StrictMode>,
);

