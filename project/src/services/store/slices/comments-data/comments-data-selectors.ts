import { NameSpace } from '../../../../consts/api-route';
import { Comment } from '../../../../types/comment';
import { State } from '../../../../types/state';

export const getComments = (state: State): Comment[] => state[NameSpace.DataComments].comments;
export const getIsCommentLoading = (state: State): boolean => state[NameSpace.DataComments].isCommentLoading;
export const getIsDataLoading = (state: State): boolean => state[NameSpace.DataComments].isDataLoading;
