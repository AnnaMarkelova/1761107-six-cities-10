import React from 'react';
import { Hotel } from '../../types/hotel';
import { cityCardType, hotelType } from '../../const/const';

type PlaceCardProps = {
  hotel: Hotel;
  cardType: string;
}

export const PlaceCard: React.FunctionComponent<PlaceCardProps> = ({ hotel, cardType }) => (
  <article className={`${cardType} place-card`}>
    {hotel.isPremium
      ? <div className="place-card__mark"> <span>Premium</span> </div>
      : ''}
    {cardType === cityCardType.CITIES_CARD &&
      (
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img className="place-card__image" src={hotel.previewImage} width="260" height="200" alt="Place image" />
          </a>
          {/* <Link to={`/${AppRoute.Room}/:id`}>
            <img className="place-card__image" src={hotel.previewImage} width="260" height="200" alt="Place image" />
          </Link> */}
        </div>
      )}
    {cardType === cityCardType.FAVORITES_CARD &&
      (
        <div className="favorites__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img className="place-card__image" src="img/apartment-small-03.jpg" width="150" height="110" alt="Place image" />
          </a>
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
          : ''}`} type="button"
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
        <a href="#">{hotel.title}</a>
      </h2>
      <p className="place-card__type">{hotelType[hotel.type]}</p>
    </div>
  </article>
);
