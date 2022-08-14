import React, { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchNewCommentAction } from '../../services/store/api-actions';
import { getIsDataLoading } from '../../services/store/slices/comments-data/comments-data-selectors';
import { getCurrentHotel } from '../../services/store/slices/hotels-data/hotels-data-selectors';
import { RatingForm } from '../rating-form/rating-form';

const MIN_LENGTH_COMMENT = 50;
const MAX_LENGTH_COMMENT = 300;

export const CommentCardNew: React.FunctionComponent = () => {

  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
  });

  const currentHotel = useAppSelector(getCurrentHotel);
  const isCommentLoading = useAppSelector(getIsDataLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isCommentLoading) {
      setFormData({
        rating: 0,
        comment: ''
      });
    }
  }, [isCommentLoading]);

  const btnDisable = (formData.rating === 0 || formData.comment.length <= MIN_LENGTH_COMMENT) || isCommentLoading;

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch((fetchNewCommentAction({ comment: formData.comment, rating: formData.rating, hotelId: currentHotel?.id })));
  };

  return (
    <form
      onSubmit={onSubmit}
      className="reviews__form form"
      action="#"
      method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <RatingForm
        value={formData.rating}
        onChange={(value) => {
          setFormData({ ...formData, rating: value });
        }}
      />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        maxLength={MAX_LENGTH_COMMENT}
        value={formData.comment}
        onChange={(evt) => {
          const { value } = evt.target;
          setFormData({ ...formData, comment: value });
        }}
        readOnly={isCommentLoading}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={btnDisable}
        >Submit
        </button>
      </div>
    </form>
  );
};
