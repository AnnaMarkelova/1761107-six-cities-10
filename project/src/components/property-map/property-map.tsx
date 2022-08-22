import React from 'react';
import { Map } from '../../components/map/map';
import { useAppSelector } from '../../hooks';
import { getCurrentHotel, getNearbyHotels } from '../../services/store/slices/hotels-data/hotels-data-selectors';

export const PropertyMap: React.FunctionComponent = () => {

  const hotel = useAppSelector(getCurrentHotel);
  const nearbyHotels = useAppSelector(getNearbyHotels);

  let hotels = nearbyHotels;
  if (hotel) {
    hotels = [...nearbyHotels, hotel];
  }

  return (
    <section className="property__map map" data-testid={'rootElementPropertyMap'}>
      <Map
        selectedHotel={hotel}
        hotels={hotels}
        style={{
          height: '579px',
          width: '1146px',
          margin: '0 auto',
        }}
      />
    </section>
  );
};
