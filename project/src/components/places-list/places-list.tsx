import React from 'react';
import { cityCardType } from '../../consts/city-card-type';
import { Hotel } from '../../types/hotel';
import { PlaceCard } from '../place-card/place-card';

type PlacesListProps = {
  hotels: Hotel[];
  onListItemHover: (id: number | undefined) => void;
}

export const PlacesList: React.FunctionComponent<PlacesListProps> = ({ hotels, onListItemHover }) => (
  <div className="cities__places-list places__list tabs__content">
    {hotels.map((item) => (
      <PlaceCard
        key={item.id}
        hotel={item}
        cardType={cityCardType.CITIES_CARD}
        onListItemHover={onListItemHover}
      />))}
  </div>
);
