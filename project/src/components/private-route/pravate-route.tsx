import React from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../consts/app-route';
import { AuthorizationStatus } from '../../consts/authorization-status';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

export const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({ authorizationStatus, children }) => (
  authorizationStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={AppRoute.Login} />
);
