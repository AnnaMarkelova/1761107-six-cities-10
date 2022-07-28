import React from 'react';
import { cityCardType } from '../../consts/city-card-type';
import { useAppSelector } from '../../hooks';
import { Hotel } from '../../types/hotel';
import { sortHotels } from '../../utils/hotel-utils';
import { PlaceCard } from '../place-card/place-card';

type PlacesListProps = {
  hotels: Hotel[];
  onListItemHover: (id: number | undefined) => void;
}

export const PlacesList: React.FunctionComponent<PlacesListProps> = ({ hotels, onListItemHover }) => {

  const sort = useAppSelector((state) => state.reducerSort.sort);
  const currentHotels = sortHotels.find((item) => item.sortType === sort)?.getSortHotels(hotels);

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
