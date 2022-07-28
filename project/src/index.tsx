import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { getUser } from './mock/user';
import { store } from './store';
import { getFavoriteHotels } from './utils/hotel-utils';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const Setting = {
  favoritesHotels: getFavoriteHotels(),
  user: getUser()
};

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        favoritesHotels={Setting.favoritesHotels}
        user={Setting.user}
      />
    </Provider>
  </React.StrictMode>,
);

