import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeComment } from '../../utils/mock';
import HistoryRouter from '../history-route/history-route';
import { CommentCard } from './comment-card';

const history = createMemoryHistory();


describe('Component: CommentCard', () => {

  it('should render correctly', () => {
    const comment = makeFakeComment();
    render(
      <HistoryRouter history={history}>
        <CommentCard
          comment={comment}
        />
      </HistoryRouter>
    );

    expect(screen.getByText(comment.comment)).toBeInTheDocument();

  });
});
