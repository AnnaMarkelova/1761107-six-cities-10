import React from 'react';
import { Header } from '../../components/header/header';
import { Hotel } from '../../types/hotel';
import { User } from '../../types/user';
import { FavoriteLocation } from '../../components/favorite-location/favorite-location';
import { Footer } from '../../components/footer/footer';

type FavoritesScreenProps = {
  favoritesHotels: Hotel[]
  user: User
}

export const FavoritesScreen: React.FunctionComponent<FavoritesScreenProps> = ({ favoritesHotels, user }) => {

  const citiesList = new Set(favoritesHotels.map((item) => item.city.name));

  return (
    <div className={`page ${favoritesHotels.length
      ? ''
      : 'page--favorites-empty'}`}
    >
      <Header
        favoritesHotelsCount={favoritesHotels.length}
        user={user}
        hasLoginBlock
        hasAuthorization
      />
      {favoritesHotels.length && (
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
