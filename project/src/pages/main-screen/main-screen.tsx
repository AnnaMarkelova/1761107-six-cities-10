import React, { useEffect, useState } from 'react';
import { Hotel } from '../../types/hotel';
import { Header } from '../../components/header/header';
import { CitiesPlaces } from '../../components/cities-places/cities-places';
import { Map } from '../../components/map/map';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CitiesList } from '../../components/cities-list/cities-list';
import { getHotelsByCity } from '../../utils/hotel-utils';
import { fetchHotelsAction } from '../../services/store/api-actions';
import { LoaderThreeDots } from '../../components/loader/loader';
import { getCity } from '../../services/store/slices/city-data/city-data-selectors';
import { getHotels, getIsDataLoading } from '../../services/store/slices/hotels-data/hotels-data-selectors';

export const MainScreen: React.FunctionComponent = () => {

  const city = useAppSelector(getCity);
  const hotels = useAppSelector(getHotels);
  const isDataLoading = useAppSelector(getIsDataLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHotelsAction());
  }, [dispatch]);

  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const hotelsByCity = getHotelsByCity(hotels, city);

  const onListItemHover = (listItemId: number | undefined) => {
    const currentHotel = hotelsByCity.find((item) => item.id === listItemId);
    setSelectedHotel(currentHotel ? currentHotel : null);
  };

  const mainClass = classNames({
    'page__main': true,
    'page__main--index': true,
    'page__main--index-empty': !hotelsByCity.length
  });

  const placesContainerClass = classNames({
    'container': true,
    'cities__places-container': true,
    'cities__places-container--empty': !hotelsByCity.length
  });

  return (
    <>
      {isDataLoading && <LoaderThreeDots />}
      <div className="page page--gray page--main">
        <Header />
        <main className={mainClass}>
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <CitiesList />
          </div>
          <div className="cities">
            <div className={placesContainerClass}>
              <CitiesPlaces
                onListItemHover={onListItemHover}
              />
              <div className="cities__right-section">
                {hotelsByCity.length > 0 &&
                  <section className="cities__map map">
                    <Map
                      selectedHotel={selectedHotel}
                      hotels={hotelsByCity}
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
    </>
  );
};
