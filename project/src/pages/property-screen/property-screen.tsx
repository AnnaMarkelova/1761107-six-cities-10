import classNames from 'classnames';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CommentsList } from '../../components/comments-list/comments-list';
import { Header } from '../../components/header/header';
import { Map } from '../../components/map/map';
import { PlaceCard } from '../../components/place-card/place-card';
import { cityCardType } from '../../consts/city-card-type';
import { hotelType } from '../../consts/hotel-type';
import { Comment } from '../../types/comment';
import { Hotel } from '../../types/hotel';
import { User } from '../../types/user';
import { getHotelById } from '../../utils/hotel-utils';

const COUNT_PICTURES = 6;
interface PropertyScreenProps {
  user: User;
  comments: Comment[];
  favoritesHotelsCount: number;
  nearHotels: Hotel[];
}

export const PropertyScreen: React.FunctionComponent<PropertyScreenProps> = ({ user, comments, favoritesHotelsCount, nearHotels }) => {

  const params = useParams();
  const hotel = getHotelById(Number(params.id));

  const [selectedHotel, setSelectedHotel] = useState<Hotel | undefined>(undefined);

  const onListItemHover = (listItemId:number | undefined) => {
    const currentHotel = nearHotels.find((item) => item.id === listItemId);
    setSelectedHotel(currentHotel ? currentHotel : undefined);
  };

  if (hotel === undefined) {
    return <p> Page not found </p>;
  }

  const btnClass = classNames ({
    'button': true,
    'property__bookmark-button': true,
    'property__bookmark-button--active': hotel.isFavorite
  });

  const userAvatarClass = classNames ({
    'property__avatar-wrapper': true,
    'user__avatar-wrapper': true,
    'property__avatar-wrapper--pro': hotel.host.isPro
  });

  return (
    <div className="page">
      <Header
        favoritesHotelsCount={favoritesHotelsCount}
        user={user}
        hasLoginBlock
        hasAuthorization
      />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {hotel.images.slice(0, COUNT_PICTURES).map((item) => (
                <div className="property__image-wrapper" key={item}>
                  <img className="property__image" src={item} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {hotel.isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>)}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {hotel.title}
                </h1>
                <button className={btnClass} type="button">
                  <svg className="property__bookmark-icon place-card__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: hotel.rating * 10 }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{hotel.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {hotelType[hotel.type]}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {hotel.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {hotel.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{hotel.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {hotel.goods.map((item) => (
                    <li className="property__inside-item" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={userAvatarClass}>
                    <img className="property__avatar user__avatar" src={hotel.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {hotel.host.name}
                  </span>
                  {hotel.host.isPro && (
                    <span className="property__user-status">
                      Pro
                    </span>)}
                </div>
                <div className="property__description">
                  {/* каждое предложение в отдельном параграфе! */}
                  <p className="property__text">
                    {hotel.description}
                  </p>
                </div>
              </div>
              <CommentsList
                comments={comments}
              />
            </div>
          </div>
          <section className="property__map map">
            <Map
              city={hotel.city}
              hotels={nearHotels}
              selectedHotel={selectedHotel}
              style={{
                height: '579px',
                width: '1146px'
              }}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearHotels.map((item) => (
                <PlaceCard
                  key={item.id}
                  hotel={item}
                  cardType={cityCardType.CITIES_CARD}
                  onListItemHover={onListItemHover}
                />))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
