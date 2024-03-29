import React from 'react';
import { Hotel } from '../../types/hotel';
import PlaceCard from '../place-card/place-card';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts/app-route';
import { CityCardType } from '../../consts/city-card-type';

type FavoritesLocationProps = {
  city: string
  hotels: Hotel[]
}

export const FavoriteLocation: React.FunctionComponent<FavoritesLocationProps> = ({ city, hotels }) => (
  <li className="favorites__locations-items">
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <Link className="locations__item-link" to={AppRoute.Main}>
          <span>{city}</span>
        </Link>
      </div>
    </div>
    <div className="favorites__places">
      {hotels.map((item) => (
        <PlaceCard
          key={item.id}
          hotel={item}
          cardType={CityCardType.FavoritesCard}
        />
      ))}
    </div>
  </li>
);
