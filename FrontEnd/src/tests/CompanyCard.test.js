import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CompanyCard from '../components/CompanyCard/CompanyCard';

const mockedUser = {
  email: 'test@test.com',
  id: 1,
  name: 'Test',
  profile_id: 1,
  surname: 'Test'
};
jest.mock('../hooks/useAuth', () => ({
    useAuth: () => {
      return mockedUser;
  },
}));

afterEach(cleanup);

const company_liked = {
  id: 1,
  name: 'Testname',
  region: 'Testregion',
  founded: 2006,
  service_info: 'Testinfo',
  address: 'Testadress',
  banner_image: '',
  is_saved: true,
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
  activities: [
    {
      id: 1,
      name: 'cheese',
    },
  ],
};

const company_unliked = {
  id: 1,
  name: 'Testname_unlike',
  region: 'Testregion_unlike',
  founded: 2006,
  service_info: 'Testinfo_unlike',
  address: 'Testadress_unlike',
  banner_image: '',
  is_saved: false,
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
  activities: [
    {
      id: 1,
      name: 'cheese',
    },
  ],
};

describe('CompanyCard component unit tests', () => {
  test('renders region', () => {
    render(
      <MemoryRouter>
        <CompanyCard profile={company_liked} isAuthorized={true} />
      </MemoryRouter>
    );
    const divElement = screen.getByText(/Testregion/i, { exact: false });
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
          <CompanyCard profile={company_liked} isAuthorized={true} />
        </MemoryRouter>
      );
      expect(screen.getByTestId('star')).toBeInTheDocument();
      expect(axios.post).toBeenCalledWith(
        'http://localhost:8000/api/saved-list/',
        { company_pk: 1 }
      );
    };
  });

  test('testing empty stars', () => {
    render(
      <MemoryRouter>
        <CompanyCard isAuthorized={true} profile={company_unliked} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('emptystar')).toBeInTheDocument();
  });
});
