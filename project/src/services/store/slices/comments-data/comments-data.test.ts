import { CommentsData } from '../../../../types/state';
import { makeFakeComment } from '../../../../utils/mock';
import { fetchCommentsAction } from '../../api-actions';
import { commentsData } from './comments-data';

describe('Reducer: commentsData', () => {

  let state: CommentsData;

  it('without additional parameters should return initial state', () => {
    expect(commentsData.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({ comments: []});
  });

  it('should update comments by load comments', () => {
    const loadedComments = new Array(4).fill(null).map(() => makeFakeComment());
    expect(commentsData.reducer(state, { type: fetchCommentsAction.fulfilled.type, payload: loadedComments }))
      .toEqual({ comments: loadedComments});
  });
});
