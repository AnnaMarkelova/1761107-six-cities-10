import { AsyncThunkAction } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '.';
import { RequestStatus } from '../consts/request-status';

export const UseDispatchAsyncAction = (asyncAction: AsyncThunkAction<unknown, unknown, object>) => {

  const dispatch = useAppDispatch();

  const [requestStatus, setRequestStatus] = useState<RequestStatus>(RequestStatus.Idle);

  useEffect(() => {
    async function fetchData() {
      try {
        setRequestStatus(RequestStatus.Loading);
        await dispatch(asyncAction);
        setRequestStatus(RequestStatus.Succeeded);
      } catch (err) {
        setRequestStatus(RequestStatus.Failed);
      }
    }

    if (requestStatus === RequestStatus.Idle) {
      fetchData();
    }

    return () => setRequestStatus(RequestStatus.Idle);
  }, [dispatch, setRequestStatus, requestStatus, asyncAction]);

  return requestStatus;
};
