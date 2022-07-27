import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { sortType } from './consts/sort-type';
import { getUser } from './mock/user';
import { store } from './store';
import { getFavoriteHotels } from './utils/hotel-utils';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const Setting = {
  CURRENT_SORT: sortType.POPULAR,
  favoritesHotels: getFavoriteHotels(),
  user: getUser()
};

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        currentSort={Setting.CURRENT_SORT}
        favoritesHotels={Setting.favoritesHotels}
        user={Setting.user}
      />
    </Provider>
  </React.StrictMode>,
);

