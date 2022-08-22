import classNames from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../consts/app-route';
import { AuthorizationStatus } from '../../consts/authorization-status';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchHotelStatusFavoriteAction } from '../../services/store/api-actions';
import { getCurrentHotel } from '../../services/store/slices/hotels-data/hotels-data-selectors';
import { getAuthorizationStatus } from '../../services/store/slices/root/root-selectors';

export const PropertyTitleBlock: React.FunctionComponent = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentHotel = useAppSelector(getCurrentHotel);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const hasAuthorization = authorizationStatus === AuthorizationStatus.Auth;

  const btnClass = classNames({
    'button': true,
    'property__bookmark-button': true,
    'property__bookmark-button--active': hasAuthorization ? currentHotel?.isFavorite : false,
  });

  return (
    <div className="property__name-wrapper">
      <h1 className="property__name">
        {currentHotel?.title}
      </h1>
      <button
        onClick={() => {
          if (!hasAuthorization) {
            navigate(AppRoute.Login);
            return;
          }
          dispatch(fetchHotelStatusFavoriteAction({ hotelId: currentHotel ? currentHotel.id : 0, status: currentHotel?.isFavorite ? 0 : 1 }));
        }}
        className={btnClass}
        type="button"
        data-testid="onClickStatusFavorite"
      >
        <svg className="property__bookmark-icon place-card__bookmark-icon" width="31" height="33">
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
        <span className="visually-hidden">To bookmarks</span>
      </button>
    </div>
  );
};
