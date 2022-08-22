import React, { useCallback, useState } from 'react';
import { Hotel } from '../../types/hotel';
import CitiesPlaces from '../../components/cities-places/cities-places';
import { Map } from '../../components/map/map';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks';
import { SelectHotelsByCity } from '../../services/selectors/get-hotels';

export const HotelsContainer: React.FunctionComponent = () => {

  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const hotelsByCity = useAppSelector(SelectHotelsByCity);

  const onListItemHover = useCallback(
    (listItemId: number | undefined) => {
      const currentHotel = hotelsByCity.find((item) => item.id === listItemId);
      setSelectedHotel(currentHotel ? currentHotel : null);
    }, [hotelsByCity]
  );

  const placesContainerClass = classNames({
    'container': true,
    'cities__places-container': true,
    'cities__places-container--empty': !hotelsByCity.length
  });

  return (
    <div className="cities" data-testid={'rootElementHotelsContainer'}>
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
