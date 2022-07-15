import React from 'react';
import { Location } from '../../components/location/location';
import { Hotel } from '../../types/hotel';
import { cities } from '../../const/const';
import { Header } from '../../components/header/header';
import { CitiesPlaces } from '../../components/cities-places/cities-places';
import { CitiesMap } from '../../components/cities-map/cities-map';
import { User } from '../../types/user';

type MainScreenProps = {
  currentCity: string;
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
              <li className="locations__item" key={item}>
                <Location
                  city={item}
                  currentCity={currentCity}
                />
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
          <CitiesMap
            hotelsCount={hotels.length}
          />
        </div>
      </div>
    </main>
  </div>
);

