import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../../consts/app-route';

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
