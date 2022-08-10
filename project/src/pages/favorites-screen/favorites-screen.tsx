import React from 'react';
import { Header } from '../../components/header/header';
import { FavoriteLocation } from '../../components/favorite-location/favorite-location';
import { Footer } from '../../components/footer/footer';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks';
import { LoaderThreeDots } from '../../components/loader/loader';

export const FavoritesScreen: React.FunctionComponent = () => {

  const {favoritesHotels, isDataLoading} = useAppSelector((state) => state);

  const citiesList = new Set(favoritesHotels.map((item) => item.city.name));

  const pageClass = classNames ({
    'page': true,
    'page--favorites-empty': !favoritesHotels.length
  });

  return (
    <div className={pageClass}>
      {isDataLoading && <LoaderThreeDots />}
      <Header />
      {favoritesHotels.length > 0 && (
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {[...citiesList].map((cityItem) => (
                  <FavoriteLocation
                    key={cityItem}
                    city={cityItem}
                    hotels={favoritesHotels.filter((item) => item.city.name === cityItem)}
                  />
                ))}
              </ul>
            </section>
          </div>
        </main>
      )}
      {!favoritesHotels.length && (
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          </div>
        </main>
      )}
      < Footer />
    </div>
  );
};
