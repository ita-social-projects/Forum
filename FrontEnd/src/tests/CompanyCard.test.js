import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CompanyCard from '../components/CompanyCard/CompanyCard';

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
    render(
      <MemoryRouter>
        <CompanyCard profile={company_liked} isAuthorized={true} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('star')).toBeInTheDocument();
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
