import React from 'react';

type LocationProps = {
  city: string;
  currentCity: string;
}

export const Location: React.FunctionComponent<LocationProps> = ({ city, currentCity }) => (
  <a className={`locations__item-link tabs__item ${currentCity === city
    ? 'tabs__item--active'
    : 'href="#"'}`}
  >
    <span>{city}</span>
  </a>
);
