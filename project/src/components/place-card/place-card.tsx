import React from 'react';
import { Hotel } from '../../types/hotel';
import { Link } from 'react-router-dom';
import { cityCardType } from '../../consts/city-card-type';
import { AppRoute } from '../../consts/app-route';
import { hotelType } from '../../consts/hotel-type';

type PlaceCardProps = {
  hotel: Hotel;
  cardType: string;
  onListItemHover?: (id: number | undefined) => void;
}

export const PlaceCard: React.FunctionComponent<PlaceCardProps> = ({ hotel, cardType, onListItemHover }) => (
  <article
    className={`${cardType} place-card`}
    onMouseEnter = {() => {
      onListItemHover && onListItemHover(hotel.id);
    }}
    onMouseLeave = {() => {
      onListItemHover && onListItemHover(undefined);
    }}
  >
    {hotel.isPremium && <div className="place-card__mark"> <span>Premium</span> </div>}
    {cardType === cityCardType.CITIES_CARD &&
      (
        <div className="cities__image-wrapper place-card__image-wrapper">
          <Link to={{pathname: `${AppRoute.Room}/${hotel.id}`}}>
            <img className="place-card__image" src={hotel.previewImage} width="260" height="200" alt="Place image" />
          </Link>
        </div>
      )}
    {cardType === cityCardType.FAVORITES_CARD &&
      (
        <div className="favorites__image-wrapper place-card__image-wrapper">
          <Link to={{pathname: `${AppRoute.Room}/${hotel.id}`}}>
            <img className="place-card__image" src={hotel.previewImage} width="150" height="110" alt="Place image" />
          </Link>
        </div>
      )}
    <div className={`place-card__info ${cardType === cityCardType.FAVORITES_CARD && 'favorites__card-info'}`}>
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{hotel.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className={`place-card__bookmark-button button ${hotel.isFavorite
          ? 'place-card__bookmark-button--active'
          : ''}`}
        type="button"
        >
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{ width: hotel.rating * 10 }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={{pathname: `${AppRoute.Room}/${hotel.id}`}}>{hotel.title}
        </Link>
      </h2>
      <p className="place-card__type">{hotelType[hotel.type]}</p>
    </div>
  </article>
);
