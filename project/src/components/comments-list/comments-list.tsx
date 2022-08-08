import React from 'react';
import { AuthorizationStatus } from '../../consts/authorization-status';
import { useAppSelector } from '../../hooks';
import { CommentCardNew } from '../comment-card-new/comment-card-new';
import { CommentCard } from '../comment-card/comment-card';


export const CommentsList: React.FunctionComponent = () => {

  const {comments, authorizationStatus} = useAppSelector((state) => state);
  const hasAuthorization = authorizationStatus === AuthorizationStatus.Auth;

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
