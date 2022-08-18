import React, { FormEvent, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { AppRoute } from '../../consts/app-route';
import { AuthorizationStatus } from '../../consts/authorization-status';
import { cities } from '../../consts/cities';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../services/store/api-actions';
import { setCity } from '../../services/store/slices/city-data/city-data';
import { getAuthorizationStatus } from '../../services/store/slices/root/root-selectors';
import { AuthData } from '../../types/auth-data';
import { getRandomNumber } from '../../utils/utills';

export const LoginScreen: React.FunctionComponent = () => {

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const hasAuthorization = authorizationStatus === AuthorizationStatus.Auth;

  const randomCity = cities[getRandomNumber(0, cities.length - 1)];

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  if (hasAuthorization) {
    return <Navigate to={AppRoute.Main} ></Navigate>;
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              onSubmit={handleSubmit}
              className="login__form form"
              action=""
              method="post"
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                onClick={() => (
                  dispatch(setCity(randomCity))
                )}
                to={AppRoute.Main}
              >
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

