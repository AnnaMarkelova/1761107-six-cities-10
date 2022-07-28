import React, { useState } from 'react';
import { Hotel } from '../../types/hotel';
import { Header } from '../../components/header/header';
import { CitiesPlaces } from '../../components/cities-places/cities-places';
import { User } from '../../types/user';
import { Map } from '../../components/map/map';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks';
import { CitiesList } from '../../components/cities-list/cities-list';

type MainScreenProps = {
  favoritesHotelsCount: number;
  user: User;
}

export const MainScreen: React.FunctionComponent<MainScreenProps> = ({ favoritesHotelsCount, user }) => {

  const hotels = useAppSelector((state) => state.reducerCity.hotels);

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
          <CitiesList/>
        </div>
        <div className="cities">
          <div className={placesContainerClass}>
            <CitiesPlaces
              onListItemHover={onListItemHover}
            />
            <div className="cities__right-section">
              {hotels.length > 0 &&
                <section className="cities__map map">
                  <Map
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
