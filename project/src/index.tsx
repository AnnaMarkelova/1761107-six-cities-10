import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { sortType } from './consts/sort-type';
import { getUser } from './mock/user';
import { getFavoriteHotels, getHotelsByCity } from './utils/hotel-utils';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const CURRENT_CITY = 'Amsterdam';

const Setting = {
  CURRENT_CITY: 'Amsterdam',
  CURRENT_SORT: sortType.POPULAR,
  hotels: getHotelsByCity(CURRENT_CITY),
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

