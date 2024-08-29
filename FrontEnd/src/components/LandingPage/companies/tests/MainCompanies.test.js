import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainCompanies from '../Companies';

afterEach(() => {
  jest.resetAllMocks();
});

const results = [
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
];

describe('MainCompanies component unit tests', () => {
  test('renders new members results', () => {
    jest.mock('axios');
    const axios = require('axios');

    () => {
      axios.get.mockResolvedValue({
        results: [results],
      });
      render(
        <MemoryRouter>
          <MainCompanies isAuthorized={true} />
        </MemoryRouter>
      );
      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:8000/api/profiles/?ordering=-completeness,-created_at'
      );
      const divElement = screen.getByText(/Нові учасники/i, { exact: false });
      const onenameElement = screen.getByText(/saleonline/i, {
        exact: false,
      });
      expect(divElement).toBeInTheDocument();
      expect(onenameElement).toBeInTheDocument();
    };
  });
});
