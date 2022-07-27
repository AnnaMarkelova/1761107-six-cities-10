import React, { useState } from 'react';
import { Hotel } from '../../types/hotel';
import { City } from '../../types/city';
import { Header } from '../../components/header/header';
import { CitiesPlaces } from '../../components/cities-places/cities-places';
import { User } from '../../types/user';
import { cities } from '../../consts/cities';
import { Map } from '../../components/map/map';
import classNames from 'classnames';

type MainScreenProps = {
  currentCity: City;
  currentSort: string;
  hotels: Hotel[];
  favoritesHotelsCount: number;
  user: User;
}

export const MainScreen: React.FunctionComponent<MainScreenProps> = ({ currentCity, currentSort, hotels, favoritesHotelsCount, user }) => {

  const [selectedHotel, setSelectedHotel] = useState<Hotel | undefined>(undefined);

  const onListItemHover = (listItemId: number | undefined) => {
    const currentHotel = hotels.find((item) => item.id === listItemId);
    setSelectedHotel(currentHotel ? currentHotel : undefined);
  };

  const mainClass = classNames({
    'page__main': true,
    'page__main--index': true,
    'page__main--index-empty': !hotels.length
  });

  const placesContainerClass = classNames({
    'container': true,
    'cities__places-container': true,
    'cities__places-container--empty': !hotels.length
  });

  return (
    <div className="page page--gray page--main">
      <Header
        favoritesHotelsCount={favoritesHotelsCount}
        user={user}
        hasLoginBlock
        hasAuthorization
      />
      <main className={mainClass}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {cities.map((item) => (
                <li className="locations__item" key={item.name}>
                  <a className={`locations__item-link tabs__item ${currentCity === item
                    ? 'tabs__item--active'
                    : ''}`}
                  href="#/"
                  >
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className={placesContainerClass}>
            <CitiesPlaces
              currentSort={currentSort}
              hotels={hotels}
              onListItemHover={onListItemHover}
            />
            <div className="cities__right-section">
              {hotels.length > 0 &&
                <section className="cities__map map">
                  <Map
                    city={currentCity}
                    hotels={hotels}
                    selectedHotel={selectedHotel}
                    style={{
                      height: '100%',
                      width: '512px'
                    }}
                  />
                </section>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
