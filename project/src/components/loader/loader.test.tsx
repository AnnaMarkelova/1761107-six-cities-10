import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import { LoaderThreeDots } from './loader';

const history = createMemoryHistory();


describe('Component: LoaderThreeDots', () => {

  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <LoaderThreeDots/>
      </HistoryRouter>
    );
    expect(screen.getByTestId('ThreeDots')).toBeInTheDocument();

  });
});
