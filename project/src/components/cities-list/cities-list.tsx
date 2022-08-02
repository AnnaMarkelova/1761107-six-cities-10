import React from 'react';
import { cities } from '../../consts/cities';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCity } from '../../store/action';


export const CitiesList: React.FunctionComponent = () => {

  const city = useAppSelector((state) => state.city);

  const dispatch = useAppDispatch();

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((item) => (
          <li className="locations__item" key={item.name}>
            <a className={`locations__item-link tabs__item ${city === item
              ? 'tabs__item--active'
              : ''}`}
            href='#/'
            onClick={() => (dispatch(setCity(item)))}
            >
              <span>{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
