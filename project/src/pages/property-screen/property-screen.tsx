import React from 'react';
import { useParams } from 'react-router-dom';
import { CommentCard } from '../../components/comment-card/comment-card';
import { Header } from '../../components/header/header';
import { PlaceCard } from '../../components/place-card/place-card';
import { RatingForm } from '../../components/rating-form/rating-form';
import { cityCardType, hotelType } from '../../consts/consts';
import { getHotelById } from '../../mock/hotels';
import { Comment } from '../../types/comment';
import { Hotel } from '../../types/hotel';
import { User } from '../../types/user';

const COUNT_PICTURES = 6;

interface PropertyScreenProps {
  hotelId: number;
  user: User;
  comments: Comment[];
  favoritesHotelsCount: number;
  nearHotels: Hotel[];
}

export const PropertyScreen: React.FunctionComponent<PropertyScreenProps> = ({ hotelId, user, comments, favoritesHotelsCount, nearHotels}) => {

  const params = useParams();

  const hotel = getHotelById(Number(params.id));

  if (hotel === undefined) {
    return <p> Page not found </p>;
  }

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
                {/* Это свойство не работает, спросить у куратора property__bookmark-button--active */}
                <button className={`property__bookmark-button button ${hotel.isFavorite
                  ? 'property__bookmark-button--active'
                  : ''
                }`} type="button"
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
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
                  <div className={`property__avatar-wrapper user__avatar-wrapper ${hotel.host.isPro
                    ? 'property__avatar-wrapper--pro'
                    : ''
                  }`}
                  >
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
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                <ul className="reviews__list">
                  {comments.map((item) => (
                    <CommentCard
                      key={`{item.id} - ${item.user.id}`}
                      comment={item}
                    />
                  ))}
                </ul>
                <form className="reviews__form form" action="#" method="post">
                  <label className="reviews__label form__label" htmlFor="review">Your review</label>
                  <RatingForm />
                  <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
                  <div className="reviews__button-wrapper">
                    <p className="reviews__help">
                      To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
                    </p>
                    <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
                  </div>
                </form>
              </section>
            </div>
          </div>
          <section className="property__map map"></section>
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
                />))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
