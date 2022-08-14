import React, { useEffect } from 'react';
import { AuthorizationStatus } from '../../consts/authorization-status';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCommentsAction } from '../../services/store/api-actions';
import { getComments, getIsCommentLoading } from '../../services/store/slices/comments-data/comments-data-selectors';
import { getCurrentHotel } from '../../services/store/slices/hotels-data/hotels-data-selectors';
import { getAuthorizationStatus } from '../../services/store/slices/user-process/user-process-selectors';
import { sortDateDown } from '../../utils/utills';
import { CommentCardNew } from '../comment-card-new/comment-card-new';
import { CommentCard } from '../comment-card/comment-card';

const MAX_COUNT_COMMENTS = 10;

export const CommentsList: React.FunctionComponent = () => {

  const comments = useAppSelector(getComments);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isCommentLoading = useAppSelector(getIsCommentLoading);
  const currentHotel = useAppSelector(getCurrentHotel);

  const hasAuthorization = authorizationStatus === AuthorizationStatus.Auth;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if ( !isCommentLoading) {
      dispatch(fetchCommentsAction({hotelId: currentHotel?.id}));
    }
  }, [ isCommentLoading, currentHotel, dispatch]);

  const selectedComments = [...comments].sort((commentA, commentB) => sortDateDown(commentB.date, commentA.date)).slice(0, MAX_COUNT_COMMENTS);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ul className="reviews__list">
        {selectedComments.map((item) => (
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
