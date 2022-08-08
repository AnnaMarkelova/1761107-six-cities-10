import React, { useEffect } from 'react';
import { AuthorizationStatus } from '../../consts/authorization-status';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCommentsAction } from '../../store/api-actions';
// import { Comment } from '../../types/comment';
// import { sortDateDown } from '../../utils/utills';
import { CommentCardNew } from '../comment-card-new/comment-card-new';
import { CommentCard } from '../comment-card/comment-card';

// const MAX_COUNT_COMMENTS = 10;

export const CommentsList: React.FunctionComponent = () => {

  const {comments, authorizationStatus, isCommentLoading, currentHotel} = useAppSelector((state) => state);
  const hasAuthorization = authorizationStatus === AuthorizationStatus.Auth;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if ( !isCommentLoading) {
      dispatch(fetchCommentsAction({hotelId: currentHotel?.id}));
    }
  }, [ isCommentLoading, currentHotel, dispatch]);

  // const selectedComments = comments?.sort((commentA: Comment, commentB: Comment) => sortDateDown(commentB.date, commentA.date));

  // const selectedComments = comments.sort((commentA: Comment, commentB: Comment) => commentB.rating - commentA.rating);
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ul className="reviews__list">
        {comments.map((item) => (
          <CommentCard
            key={`${item.id} - ${item.user.id}`}
            comment={item}
          />
        ))}
      </ul>
      {hasAuthorization && <CommentCardNew />}
    </section>
  );
};
