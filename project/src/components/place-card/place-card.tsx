import React from 'react';
import classNames from 'classnames';
import { Hotel } from '../../types/hotel';
import { Link, useNavigate } from 'react-router-dom';
import { cityCardType } from '../../consts/city-card-type';
import { AppRoute } from '../../consts/app-route';
import { hotelType } from '../../consts/hotel-type';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../consts/authorization-status';
import { fetchHotelStatusFavoriteAction, fetchNearbyHotelsAction } from '../../store/api-actions';

const COUNT_STARS = 5;

type PlaceCardProps = {
  hotel: Hotel;
  cardType: string;
  onListItemHover?: (id: number | undefined) => void;
  isNearbyCard?: boolean;
  setNearHotelUpdated?:(value: boolean) => void;
}

export const PlaceCard: React.FunctionComponent<PlaceCardProps> = ({ hotel, cardType, onListItemHover, isNearbyCard = false, setNearHotelUpdated }) => {

  const { authorizationStatus, isHotelStatusFavoriteLoading } = useAppSelector((state) => state);
  const hasAuthorization = authorizationStatus === AuthorizationStatus.Auth;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const btnClass = classNames ({
    'button': true,
    'place-card__bookmark-button': true,
    'place-card__bookmark-button--active': hasAuthorization ? hotel.isFavorite : false,
  });

  const cardInfoClass = classNames ({
    'place-card__info': true,
    'favorites__card-info': cardType === cityCardType.FAVORITES_CARD,
  });

  return (
    <article
      className={`${cardType} place-card`}
      onMouseEnter={() => {
        onListItemHover && onListItemHover(hotel.id);
      }}
      onMouseLeave={() => {
        onListItemHover && onListItemHover(undefined);
      }}
    >
      {hotel.isPremium && <div className="place-card__mark"> <span>Premium</span> </div>}
      {cardType === cityCardType.CITIES_CARD &&
        (
          <div className="cities__image-wrapper place-card__image-wrapper">
            <Link to={{ pathname: `${AppRoute.Room}/${hotel.id}` }}>
              <img className="place-card__image" src={hotel.previewImage} width="260" height="200" alt="Place main-img" />
            </Link>
          </div>
        )}
      {cardType === cityCardType.FAVORITES_CARD &&
        (
          <div className="favorites__image-wrapper place-card__image-wrapper">
            <Link to={{ pathname: `${AppRoute.Room}/${hotel.id}` }}>
              <img className="place-card__image" src={hotel.previewImage} width="150" height="110" alt="Place main-img" />
            </Link>
          </div>
        )}
      <div className={cardInfoClass}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{hotel.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            onClick={() => {
              if (!hasAuthorization) {
                navigate(AppRoute.Login);
                return;
              }
              dispatch(fetchHotelStatusFavoriteAction({hotelId: hotel.id, status: hotel.isFavorite ? 0 : 1}));
              if (isNearbyCard) {
                fetchNearbyHotelsAction({hotelId: hotel.id});
                setNearHotelUpdated && setNearHotelUpdated(true);
              }
            }}
            className={btnClass}
            type="button"
            disabled={isHotelStatusFavoriteLoading}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width:`${ Math.round(hotel.rating) / COUNT_STARS * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={{ pathname: `${AppRoute.Room}/${hotel.id}` }}>{hotel.title}
          </Link>
        </h2>
        <p className="place-card__type">{hotelType[hotel.type]}</p>
      </div>
    </article>
  );
};
