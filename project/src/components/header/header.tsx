import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../types/user';

type HeaderProps = {
  favoritesHotelsCount?: number,
  user?: User,
  hasLoginBlock?: boolean,
  hasAuthorization?: boolean,
}

export const Header: React.FunctionComponent<HeaderProps> = ({ favoritesHotelsCount = 0, user, hasLoginBlock = false, hasAuthorization = false }) => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link className="header__logo-link header__logo-link--active" to="/">
            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
          </Link>
        </div>
        {hasLoginBlock &&
          (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    {hasAuthorization &&
                      (
                        <React.Fragment>
                          <span className="header__user-name user__name">{user?.email}</span>
                          <span className="header__favorite-count">{favoritesHotelsCount}</span>
                        </React.Fragment>
                      )}
                  </a>
                </li>
                {hasAuthorization &&
                  (
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#">
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  )}
                {!hasAuthorization && <span className="header__login">Sign in</span>}
              </ul>
            </nav>)}
      </div>
    </div>
  </header>
);
