import React from 'react';
import { sortType } from '../../consts/sort-type';
import { useAppSelector } from '../../hooks';
import { PlacesList } from '../places-list/places-list';

type CitiesPlacesProps = {
  currentSort: string;
  onListItemHover: (id: number | undefined) => void;
}

export const CitiesPlaces: React.FunctionComponent<CitiesPlacesProps> = ({ currentSort, onListItemHover }) => {

  const {city, hotels} = useAppSelector((state) => state);

  if (hotels.length) {
    return (
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{hotels.length} places to stay in {city.name}</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
            Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            {Object.keys(sortType).map((item) => (
              <li className={`places__option ${currentSort === sortType[item]
                ? 'places__option--active'
                : ''
              }`} tabIndex={0} key={item}
              > {sortType[item]}
              </li>)
            )}
          </ul>
        </form>
        < PlacesList
          hotels={hotels}
          onListItemHover={onListItemHover}
        />
      </section>
    );
  }
  return (
    <section className="cities__no-places">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">No places to stay available</b>
        <p className="cities__status-description">We could not find any property available at the moment in {city.name}</p>
      </div>
    </section>
  );
};
