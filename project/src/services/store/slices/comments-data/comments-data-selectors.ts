import { NameSpace } from '../../../../consts/api-route';
import { Comment } from '../../../../types/comment';
import { State } from '../../../../types/state';

export const getComments = (state: State): Comment[] => state[NameSpace.DataComments].comments;
