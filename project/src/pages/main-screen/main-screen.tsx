import React from 'react';
import { City, Hotel } from '../../types/hotel';
import { Header } from '../../components/header/header';
import { CitiesPlaces } from '../../components/cities-places/cities-places';
import { User } from '../../types/user';
import { cities } from '../../consts/cities';
import { Map } from '../../components/map/map';

type MainScreenProps = {
  currentCity: City;
  currentSort: string;
  hotels: Hotel[];
  favoritesHotelsCount: number;
  user: User;
}

export const MainScreen: React.FunctionComponent<MainScreenProps> = ({ currentCity, currentSort, hotels, favoritesHotelsCount, user }) => (
  <div className="page page--gray page--main">
    <Header
      favoritesHotelsCount={favoritesHotelsCount}
      user={user}
      hasLoginBlock
      hasAuthorization
    />
    <main className={`page__main page__main--index ${hotels.length
      ? ''
      : 'page__main--index-empty'}`}
    >
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
        <div className={`cities__places-container container ${hotels.length
          ? ''
          : 'cities__places-container--empty'}`}
        >
          <CitiesPlaces
            currentSort={currentSort}
            hotels={hotels}
          />
          <div className="cities__right-section">
            {/* {hotelsCount && <section className="cities__map map"></section>} */}
            <Map
              city={cities[0]}
            />
          </div>
        </div>
      </div>
    </main>
  </div>
);

