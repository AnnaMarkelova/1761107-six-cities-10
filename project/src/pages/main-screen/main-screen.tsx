import React, { useEffect } from 'react';
import { Header } from '../../components/header/header';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CitiesList } from '../../components/cities-list/cities-list';
import { getHotelsByCity } from '../../utils/hotel-utils';
import { fetchHotelsAction } from '../../services/store/api-actions';
import { LoaderThreeDots } from '../../components/loader/loader';
import { getCity } from '../../services/store/slices/city-data/city-data-selectors';
import { getHotels } from '../../services/store/slices/hotels-data/hotels-data-selectors';
import { getIsDataLoading } from '../../services/store/slices/user-process/user-process-selectors';
import { HotelsContainer } from '../../components/hotels-container/hotels-container';

export const MainScreen: React.FunctionComponent = () => {

  const city = useAppSelector(getCity);
  const hotels = useAppSelector(getHotels);

  const isDataLoading = useAppSelector(getIsDataLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHotelsAction());
  }, [dispatch]);

  const hotelsByCity = getHotelsByCity(hotels, city);

  const mainClass = classNames({
    'page__main': true,
    'page__main--index': true,
    'page__main--index-empty': !hotelsByCity.length
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
          <HotelsContainer></HotelsContainer>
        </main>
      </div>
    </>
  );
};
