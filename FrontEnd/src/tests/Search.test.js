import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Search from '../components/SearchPage/Search';

afterEach(cleanup);

describe('Search component unit tests', () => {
  test('renders sale search page', () => {
    render(
      <MemoryRouter>
        <Search isAuthorized={{ isAuth: true }} />
      </MemoryRouter>
    );
    const counterElement = screen.getByText(/РЕЗУЛЬТАТІВ ЗА ПОШУКОМ/i, {
      exact: false,
    });
    expect(counterElement).toBeInTheDocument();
  });
});
