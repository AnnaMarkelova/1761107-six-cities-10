

import React from 'react';
import { Header } from '../../components/header/header';


export const NotFoundScreen: React.FunctionComponent = () => (
  <div className="page page--gray page--login">
    <Header />
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">404.
            <br />
            <small>Page not found</small>
          </h1>
        </section>
      </div>
    </main>

  </div>
);

