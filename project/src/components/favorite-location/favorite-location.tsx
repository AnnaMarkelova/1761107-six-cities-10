import React from 'react';
import { Hotel } from '../../types/hotel';
import { PlaceCard } from '../place-card/place-card';
import { cityCardType } from '../../consts/consts';

type FavoritesLocationProps = {
  city: string
  hotels: Hotel[]
}

export const FavoriteLocation: React.FunctionComponent<FavoritesLocationProps> = ({ city, hotels }) => (
  <li className="favorites__locations-items">
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <a className="locations__item-link" href="#">
          <span>{city}</span>
        </a>
      </div>
    </div>
    <div className="favorites__places">
      {hotels.map((item) => (
        <PlaceCard
          key={item.id}
          hotel={item}
          cardType={cityCardType.FAVORITES_CARD}
        />
      ))}
    </div>
  </li>
);
