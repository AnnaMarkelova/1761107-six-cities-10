import React from 'react';
import { CITIES } from '../../consts/cities';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCity } from '../../services/store/slices/city-data/city-data';
import { getCity } from '../../services/store/slices/city-data/city-data-selectors';


export const CitiesList: React.FunctionComponent = () => {

  const city = useAppSelector(getCity);

  const dispatch = useAppDispatch();

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((item) => (
          <li className="locations__item" key={item.name}>
            <a className={`locations__item-link tabs__item ${city.name === item.name
              ? 'tabs__item--active'
              : ''}`}
            href='#/'
            onClick={() => (dispatch(setCity(item)))}
            data-testid={`ClickOnCity${item.name}`}
            >
              <span>{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
