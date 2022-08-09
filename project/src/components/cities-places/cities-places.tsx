import classNames from 'classnames';
import React from 'react';
import { sortType } from '../../consts/sort-type';
import { useAppSelector } from '../../hooks';
import { getHotelsByCity } from '../../utils/hotel-utils';
import { PlacesList } from '../places-list/places-list';

type CitiesPlacesProps = {
  onListItemHover: (id: number | undefined) => void;
}

export const CitiesPlaces: React.FunctionComponent<CitiesPlacesProps> = ({ onListItemHover }) => {

  const {city, hotels} = useAppSelector((state) => state);
  const hotelsByCity = getHotelsByCity(hotels, city);

  const [sort, setSort] = React.useState(sortType.POPULAR);
  const [isVisibleSortList, setVisibleSortList] = React.useState(false);

  const placesList = classNames ({
    'places__options': true,
    'places__options--custom': true,
    'places__options--opened': isVisibleSortList,
  });

  if (hotelsByCity.length) {
    return (
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{hotelsByCity.length} places to stay in {city.name}</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span
            className="places__sorting-type"
            tabIndex={0}
            onClick={()=> setVisibleSortList(!isVisibleSortList)}
          >
            {sort}
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className={placesList}>
            {Object.keys(sortType).map((item) => (
              <li
                className={`places__option ${sort === sortType[item]
                  ? 'places__option--active'
                  : ''
                }`}
                tabIndex={0}
                key={item}
                onClick={()=> {
                  if (sort !== sortType[item]) {
                    (setSort(sortType[item]));
                  }
                  setVisibleSortList(!isVisibleSortList);
                }}
              > {sortType[item]}
              </li>)
            )}
          </ul>
        </form>
        < PlacesList
          onListItemHover={onListItemHover}
          sort={sort}
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
