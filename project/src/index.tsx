import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { ErrorMessage } from './components/error-message/error-message';
import { store } from './store';
import { checkAuthAction, fetchFavoritesHotelsAction, fetchHotelsAction } from './store/api-actions';

store.dispatch(checkAuthAction());
store.dispatch(fetchHotelsAction());
store.dispatch(fetchFavoritesHotelsAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>,
);
