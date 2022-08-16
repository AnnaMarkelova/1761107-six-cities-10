import React, { useState } from 'react';
import { Hotel } from '../../types/hotel';
import { CitiesPlaces } from '../../components/cities-places/cities-places';
import { Map } from '../../components/map/map';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks';
import { getHotelsByCity } from '../../utils/hotel-utils';
import { getCity } from '../../services/store/slices/city-data/city-data-selectors';
import { getHotels } from '../../services/store/slices/hotels-data/hotels-data-selectors';

export const HotelsContainer: React.FunctionComponent = () => {

  const city = useAppSelector(getCity);
  const hotels = useAppSelector(getHotels);

  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const hotelsByCity = getHotelsByCity(hotels, city);

  const onListItemHover = (listItemId: number | undefined) => {
    const currentHotel = hotelsByCity.find((item) => item.id === listItemId);
    setSelectedHotel(currentHotel ? currentHotel : null);
  };

  const placesContainerClass = classNames({
    'container': true,
    'cities__places-container': true,
    'cities__places-container--empty': !hotelsByCity.length
  });

  return (
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
  );
};
