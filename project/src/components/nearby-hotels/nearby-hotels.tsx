import React, { useEffect } from 'react';
import PlaceCard from '../../components/place-card/place-card';
import { cityCardType } from '../../consts/city-card-type';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchNearbyHotelsAction } from '../../services/store/api-actions';
import { getCurrentHotel, getNearbyHotels } from '../../services/store/slices/hotels-data/hotels-data-selectors';

export const NearbyHotels: React.FunctionComponent = () => {

  const dispatch = useAppDispatch();

  const currentHotel = useAppSelector(getCurrentHotel);

  const nearbyHotels = useAppSelector(getNearbyHotels);

  useEffect(() => {
    if (currentHotel) {
      dispatch(fetchNearbyHotelsAction({ hotelId: currentHotel.id }));
    }
  }, [dispatch, currentHotel]);

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {nearbyHotels.map((item) => (
            <PlaceCard
              key={item.id}
              hotel={item}
              cardType={cityCardType.CITIES_CARD}
            />))}
        </div>
      </section>
    </div>
  );
};
