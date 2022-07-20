import React, { useState } from 'react';
import { cityCardType } from '../../consts/city-card-type';
import { Hotel } from '../../types/hotel';
import { PlaceCard } from '../place-card/place-card';

type PlacesListProps = {
  hotels: Hotel[];
}

export const PlacesList: React.FunctionComponent<PlacesListProps> = ({ hotels }) => {
  const [, setActivePlace] = useState<number>();

  return (
    <div className="cities__places-list places__list tabs__content">
      {hotels.map((item) => (
        <PlaceCard
          key={item.id}
          hotel={item}
          cardType={cityCardType.CITIES_CARD}
          onMouseOver={(id) => (setActivePlace(id))}
        />))}
    </div>
  );
};
