import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Search from '../components/SearchPage/Search';

afterEach(() => {
  jest.resetAllMocks();
});

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

  test('testing search', () => {
    jest.mock('axios');

    const axios = require('axios', () => {
      get: jest.fn().mockResolvedValue({});

      () => {
        axios.get.mockResolvedValue({
          data: [
            {
              id: 1,
              name: 'saleonline',
              categories: [
                {
                  id: 1,
                  name: 'trade',
                },
                {
                  id: 2,
                  name: 'transport',
                },
              ],
              region: 'Dnipro',
              founded: 1980,
              service_info: null,
              address: 'Kyiv',
              banner_image: null,
            },
            {
              id: 2,
              name: 'sale',
              categories: [
                {
                  id: 1,
                  name: 'trade',
                },
              ],
              region: 'Dnipro',
              founded: 2007,
              service_info: null,
              address: 'Dnipro',
              banner_image: null,
            },
            {
              id: 3,
              name: 'PizzaHousesale',
              categories: [],
              region: 'Charkiv',
              founded: null,
              service_info: null,
              address: 'Zaporija',
              banner_image: null,
            },
          ],
        });
      };

      render(
        <MemoryRouter>
          <Search isAuthorized={{ isAuth: true }} />
        </MemoryRouter>
      );
      expect(axios.get).toBeCalled();
      expect(screen.getByText(/назад/i, { exact: false })).toBeInTheDocument();
      expect(screen.getByRole('link')).toHaveAttribute('href', '/');
      expect(screen.getByText(/3/i, { exact: false })).toBeInTheDocument();
    });
  });
});
