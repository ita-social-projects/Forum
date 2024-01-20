import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CompanyCard from '../components/CompanyCard/CompanyCard';

afterEach(() => {
  jest.resetAllMocks();
});

const company = {
  id: 1,
  name: 'Testname',
  categories: [1, 2],
  region: 'Testregion',
  founded: 2006,
  service_info: 'Testinfo',
  address: 'Testadress',
  banner_image: '',
};

describe('CompanyCard component unit tests', () => {
  test('renders years of experiense', () => {
    render(
      <MemoryRouter>
        <CompanyCard isAuthorized={{ isAuth: true }} companyData={company} />
      </MemoryRouter>
    );
    const divElement = screen.getByText(/18 років досвіду/i, { exact: false });
    expect(divElement).toBeInTheDocument();
  });

  test('testing stars', () => {
    jest.mock('axios');
    const axios = require('axios');

    () => {
      axios.get.mockResolvedValue({
        results: [
          {
            id: 1,
            name: 'Testname',
            founded: 2005,
            service_info: 'Testinfo',
            person: 3,
            is_registered: true,
            is_startup: false,
            official_name: null,
            region: 'Testregion',
            region_display: 'Testregion',
            common_info: null,
            address: 'Testadress',
            categories: [1, 2],
            activities: [],
            banner_image: null,
            is_saved: true,
          },
        ],
      });
    };

    () => {
      axios.post.mockResolvedValue({
        company_pk: 1,
      });

      render(
        <MemoryRouter>
          <CompanyCard isAuthorized={{ isAuth: true }} companyData={company} />
        </MemoryRouter>
      );
      expect(screen.getByTestId('star')).toBeInTheDocument();
      expect(axios.post).toBeenCalledWith(
        'http://localhost:8000/api/saved-list/',
        { company_pk: 1 }
      );
      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:8000/api/profiles/?is_saved=True'
      );
    };
  });

  test('testing empty stars', () => {
    jest.mock('axios');
    const axios = require('axios');

    () => {
      axios.get.mockResolvedValue({
        results: [
          {
            id: 2,
            name: 'Test',
            founded: 2000,
            service_info: 'info',
            person: 4,
            is_registered: true,
            is_startup: false,
            official_name: null,
            region: 'Testregion',
            region_display: 'Testregion',
            common_info: null,
            address: 'adress',
            categories: [2],
            activities: [],
            banner_image: null,
            is_saved: true,
          },
        ],
      });
    };

    () => {
      axios.post.mockResolvedValue({
        company_pk: 1,
      });

      render(
        <MemoryRouter>
          <CompanyCard isAuthorized={{ isAuth: true }} companyData={company} />
        </MemoryRouter>
      );
      expect(screen.getByTestId('emptystar')).toBeInTheDocument();
      expect(axios.post).toBeenCalledWith(
        'http://localhost:8000/api/saved-list/',
        { company_pk: 1 }
      );
      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:8000/api/profiles/?is_saved=True'
      );
    };
  });
});
