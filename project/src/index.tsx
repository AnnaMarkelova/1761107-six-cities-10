import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const Setting = {
  CARDS_NUMBER: 5,
  FOUND_PLACES: 300,
};

root.render(
  <React.StrictMode>
    <App
      // cardNumber={Setting.CARDS_NUMBER}
      // foundPlaces={Setting.FOUND_PLACES}
    />
  </React.StrictMode>,
);
