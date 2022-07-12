import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { sortType } from './const/const';
import { garHotelsByCity, getHotels } from './mock/mock';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const CURRENT_CITY = 'Amsterdam';

const Setting = {
  CURRENT_CITY: 'Amsterdam',
  CURRENT_SORT: sortType.POPULAR,
  hotels: garHotelsByCity(CURRENT_CITY),
  favoritesHotelsCount: getHotels().filter((item)=>item.isFavorite).length
};

root.render(
  <React.StrictMode>
    <App
      currentCity={Setting.CURRENT_CITY}
      currentSort={Setting.CURRENT_SORT}
      hotels={Setting.hotels}
      favoritesHotelsCount={Setting.favoritesHotelsCount}
    />
  </React.StrictMode>,
);
