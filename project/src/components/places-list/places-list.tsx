import React from 'react';
import { cityCardType } from '../../consts/city-card-type';
import { useAppSelector } from '../../hooks';
import { getCity } from '../../services/store/slices/city-data/city-data-selectors';
import { getHotels } from '../../services/store/slices/hotels-data/hotels-data-selectors';
import { getHotelsByCity, sortHotels } from '../../utils/hotel-utils';
import { PlaceCard } from '../place-card/place-card';

type PlacesListProps = {
  onListItemHover: (id: number | undefined) => void;
  sort: string;
}

export const PlacesList: React.FunctionComponent<PlacesListProps> = ({ onListItemHover, sort }) => {

  const city = useAppSelector(getCity);
  const hotels = useAppSelector(getHotels);

  const hotelsByCity = getHotelsByCity(hotels, city);

  const currentHotels = sortHotels.find((item) => item.sortType === sort)?.getSortHotels(hotelsByCity);

  return (
    <div className="cities__places-list places__list tabs__content">
      {currentHotels?.map((item) => (
        <PlaceCard
          key={item.id}
          hotel={item}
          cardType={cityCardType.CITIES_CARD}
          onListItemHover={onListItemHover}
        />))}
    </div>
  );
};
