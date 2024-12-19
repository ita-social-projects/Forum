import { render, screen, cleanup, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';

import Search from '../Search';
import ProfileList from '../../ProfileList/ProfileList';

const mockedUser = {
  email: 'test@test.com',
  id: 1,
  name: 'Test',
  profile_id: 1,
  surname: 'Test'
};

jest.mock('../../../hooks/useAuth', () => ({
    useAuth: () => {
      return mockedUser;
  },
}));

jest.mock('axios');

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

afterEach(cleanup);

describe('Search component unit tests', () => {
  test('renders sale search page', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Search isAuthorized={true} />
        </MemoryRouter>
      );
    });
    const counterElement = screen.getByText(/Результати пошуку/i, {
      exact: false,
    });
    expect(counterElement).toBeInTheDocument();
  });

  test('testing search', async () => {
    axios.get.mockResolvedValue({
      data: {
        results: [
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
            banner: null,
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
            banner: null,
          },
          {
            id: 3,
            name: 'PizzaHousesale',
            categories: [],
            region: 'Charkiv',
            founded: null,
            service_info: null,
            address: 'Zaporija',
            banner: null,
          },
        ],
        total_items: 3,
      },
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <Search isAuthorized={true} />
        </MemoryRouter>
      );
    });

    expect(axios.get).toBeCalled();
    const links = screen.getAllByRole('link');
    links.forEach(link => {expect(link).toHaveAttribute('href');});
    expect(screen.getByText(/Результати пошуку/i, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/3/i, { exact: false })).toBeInTheDocument();
  });
});


describe('Search results unit tests', () => {
  test('renders search results', async () => {
    const results =  [
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
        banner: null,
        is_saved: true,
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
        banner: null,
        is_saved: false,
      },
      {
        id: 3,
        name: 'PizzaHousesale',
        categories: [],
        region: 'Charkiv',
        founded: null,
        service_info: null,
        address: 'Zaporija',
        banner: null,
      },
      {
        id: 4,
        name: 'salefruits',
        categories: [],
        region: null,
        founded: null,
        service_info: null,
        address: null,
        banner: null,
      },
      {
        id: 5,
        name: 'salevegetables',
        categories: [],
        region: null,
        founded: null,
        service_info: null,
        address: null,
        banner: null,
      },
      {
        id: 6,
        name: 'salebushes',
        categories: [],
        region: null,
        founded: null,
        service_info: null,
        address: null,
        banner: null,
      },
      {
        id: 7,
        name: 'GGGsale',
        categories: [],
        region: null,
        founded: null,
        service_info: null,
        address: null,
        banner: null,
      },
    ];

    const totalItems = 7;

    axios.get.mockResolvedValue({
      data: {
        results: results,
        total_items: totalItems,
      },
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <ProfileList
            isAuthorized={true}
            profiles={results}
            items={totalItems}
            current={1}
            pageSize={16}
            paginationFunc={jest.fn()}
            changeCompanies={jest.fn()}
          />
        </MemoryRouter>
      );
    });

    const nameElements = screen.getAllByText(/sale/i, { exact: false });
    expect(nameElements).toHaveLength(results.length);
  });
});
