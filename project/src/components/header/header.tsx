import React from 'react';
import { User } from '../../types/user';

type HeaderProps = {
  favoritesHotelsCount: number,
  user?: User,
  hasLoginBlock?: boolean,
  hasAuthorization?: boolean,
}

export default function Header({ favoritesHotelsCount, user, hasLoginBlock = false, hasAuthorization = false }: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </a>
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
                          <React.StrictMode>
                            <span className="header__user-name user__name">{user?.email}</span>
                            <span className="header__favorite-count">{favoritesHotelsCount}</span>
                          </React.StrictMode>
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
}