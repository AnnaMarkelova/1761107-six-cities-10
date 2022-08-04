import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { ErrorMessage } from './components/error-message/error-message';
import { getUser } from './mock/user';
import { store } from './store';
import { getFavoriteHotels } from './utils/hotel-utils';
import { checkAuthAction, fetchQuestionAction } from './store/api-actions';

store.dispatch(checkAuthAction());
store.dispatch(fetchQuestionAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const Setting = {
  favoritesHotels: getFavoriteHotels(),
  user: getUser()
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App
        favoritesHotels={Setting.favoritesHotels}
        user={Setting.user}
      />
    </Provider>
  </React.StrictMode>,
);
