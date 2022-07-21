import React from 'react';
import { Comment } from '../../types/comment';
import { CommentCardNew } from '../comment-card-new/comment-card-new';
import { CommentCard } from '../comment-card/comment-card';

interface CommentsListProps {
  comments: Comment [];
}

export const CommentsList: React.FunctionComponent<CommentsListProps> = ({comments}) => (
  <section className="property__reviews reviews">
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
    <ul className="reviews__list">
      {comments.map((item) => (
        <CommentCard
          key={`{item.id} - ${item.user.id}`}
          comment={item}
        />
      ))}
    </ul>
    <CommentCardNew />
  </section>
);
