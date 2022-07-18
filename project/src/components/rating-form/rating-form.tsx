import React from 'react';

const COUNT_STARS = 5;

const stars = () => {
  const starsArray: number[] = [];
  for (let i = 0; i < COUNT_STARS; i++) {
    starsArray.push(COUNT_STARS - i);
  }
  return starsArray;
};

export const RatingForm: React.FunctionComponent = () => (
  <div className="reviews__rating-form form__rating">
    {stars().map((item) => (
      <React.Fragment key={item}>
        <input className="form__rating-input visually-hidden" name="rating" value={item} id={`${item}-stars`} type="radio" />
        <label htmlFor={`${item}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </React.Fragment>
    ))}
  </div>
);
