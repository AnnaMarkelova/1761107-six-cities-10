import { NameSpace } from '../../../../consts/api-route';
import { AuthorizationStatus } from '../../../../consts/authorization-status';
import { State } from '../../../../types/state';
import { User } from '../../../../types/user';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.Root].authorizationStatus;
export const getUser = (state: State): User | null => state[NameSpace.Root].user;
export const getIsDataLoading = (state: State): boolean => state[NameSpace.Root].isDataLoading;
export const getDataSentSuccessfully = (state: State): boolean => state[NameSpace.Root].dataSentSuccessfully;
