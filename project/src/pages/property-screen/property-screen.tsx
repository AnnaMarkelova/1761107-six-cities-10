import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CommentsList } from '../../components/comments-list/comments-list';
import { Header } from '../../components/header/header';
import { LoaderThreeDots } from '../../components/loader/loader';
import { NearbyHotels } from '../../components/nearby-hotels/nearby-hotels';
import { PropertyMap } from '../../components/property-map/property-map';
import { PropertyTitleBlock } from '../../components/property-title-block/propperty-title-block';
import { HotelType } from '../../consts/hotel-type';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchHotelAction } from '../../services/store/api-actions';
import { setCity } from '../../services/store/slices/city-data/city-data';
import { setCurrentHotel } from '../../services/store/slices/hotels-data/hotels-data';
import { getCurrentHotel } from '../../services/store/slices/hotels-data/hotels-data-selectors';
import { getIsDataLoading } from '../../services/store/slices/root/root-selectors';
import { NotFoundScreen } from '../not-found-screen/not-found-screen';

const COUNT_PICTURES = 6;
const COUNT_STARS = 5;

export const PropertyScreen: React.FunctionComponent = () => {

  const dispatch = useAppDispatch();
  const params = useParams();

  const hotelId = Number(params.id);

  const isDataLoading = useAppSelector(getIsDataLoading);

  useEffect(() => {
    dispatch(fetchHotelAction({ hotelId }));
    return () => {
      dispatch(setCurrentHotel(null));
    };
  }, [dispatch, hotelId]);

  const hotel = useAppSelector(getCurrentHotel);

  useEffect(() => {
    dispatch((dispatch(setCity(hotel?.city))));
  }, [hotel, dispatch]);


  if (hotel === null) {
    return <NotFoundScreen></NotFoundScreen>;
  }

  const userAvatarClass = classNames({
    'property__avatar-wrapper': true,
    'user__avatar-wrapper': true,
    'property__avatar-wrapper--pro': hotel?.host.isPro
  });

  const indexOfHotelType = Object.keys(HotelType).indexOf(hotel.type as HotelType);
  const hotelTypeValue = Object.values(HotelType)[indexOfHotelType];

  return (
    <>
      {(isDataLoading) && <LoaderThreeDots />}
      <div className="page">
        <Header />
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {hotel?.images.slice(0, COUNT_PICTURES).map((item) => (
                  <div className="property__image-wrapper" key={item}>
                    <img className="property__image" src={item} alt="gallery img" />
                  </div>
                ))}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {hotel?.isPremium && (
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>)}
                <PropertyTitleBlock/>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{ width: `${Math.round(hotel ? hotel?.rating : 0) / COUNT_STARS * 100}%` }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{hotel?.rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {hotelTypeValue}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {hotel?.bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {hotel?.maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{hotel?.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {hotel?.goods.map((item) => (
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
                      <img className="property__avatar user__avatar" src={hotel?.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="property__user-name">
                      {hotel?.host.name}
                    </span>
                    {hotel?.host.isPro && (
                      <span className="property__user-status">
                        Pro
                      </span>)}
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {hotel?.description}
                    </p>
                  </div>
                </div>
                <CommentsList/>
              </div>
            </div>
            <PropertyMap></PropertyMap>
          </section>
          <NearbyHotels></NearbyHotels>
        </main>
      </div >
    </>
  );
};
