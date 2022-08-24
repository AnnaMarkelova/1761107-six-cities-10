import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts/app-route';
import { AuthorizationStatus } from '../../consts/authorization-status';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoritesHotelsAction, logoutAction } from '../../services/store/api-actions';
import { getFavoritesHotels } from '../../services/store/slices/favorites-hotels-data/favorites-hotels-data-selectors';
import { getAuthorizationStatus, getUser } from '../../services/store/slices/root/root-selectors';

interface HeaderProps {
  isLoginScreen? : boolean;
}

export const Header: React.FunctionComponent<HeaderProps> = ({isLoginScreen = false}) => {

  const favoritesHotels = useAppSelector(getFavoritesHotels);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);

  const dispatch = useAppDispatch();

  const hasAuthorization = authorizationStatus === AuthorizationStatus.Auth;

  useEffect(() => {
    if (hasAuthorization) {
      dispatch(fetchFavoritesHotelsAction());
    }
  }, [dispatch, hasAuthorization]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to="/" data-testid="linktoMainPage">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {hasAuthorization && !isLoginScreen &&
                (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites} data-testid="linktoFavotitePage">
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                          <img
                            src={`${user?.avatarUrl}`}
                            width="20"
                            height="20"
                            alt={user?.name}
                            style={{
                              borderRadius: '50%',
                            }}
                          />
                        </div>
                        <>
                          <span className="header__user-name user__name">{user?.email}</span>
                          <span className="header__favorite-count">{favoritesHotels.length}</span>
                        </>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link
                        className="header__nav-link"
                        to={AppRoute.Main}
                        onClick={(evt) => {
                          evt.preventDefault();
                          dispatch(logoutAction());
                        }}
                        data-testid="linktoMainPageByLogout"
                      >
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>
                  </>
                )}
              {!hasAuthorization && !isLoginScreen && (
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.Login}
                    data-testid="linktoLoginPage"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
