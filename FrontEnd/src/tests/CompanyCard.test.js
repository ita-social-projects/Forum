import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
// import axios, { AxiosResponse } from 'axios';
// import mockAxios from 'jest-mock-axios';

import CompanyCard from '../components/SearchPage/search_field/companies/CompanyCard';

// const axios = require('axios');
// jest.mock('axios');

//jest.mock(...) is used to automatically mock the axios
// module.jest.mock('axios');
// Create an object of type of mocked Axios.
// const mockedAxios = mockAxios();
// ('axios');

afterEach(() => {
  jest.resetAllMocks();
});
// afterEach(() => {
// cleaning up the mess left behind the previous test
// mockAxios.reset();
// });

describe('CompanyCard component unit tests', () => {
  test('renders years og experiense', () => {
    const company = {
      id: 1,
      name: 'Testname',
      categories: [1, 2],
      region: 'Testregion',
      founded: 2005,
      service_info: 'Testinfo',
      address: 'Testadress',
      banner_image: '',
    };
    // const mockedResponse = {
    //   data: company,
    //   status: 200,
    //   statusText: 'OK',
    //   headers: {},
    //   config: {},
    // };
    render(
      <MemoryRouter>
        <CompanyCard isAuthorized={{ isAuth: true }} companyData={company} />
      </MemoryRouter>
    );
    const divElement = screen.getByText(/18 років досвіду/i, { exact: false });
    expect(divElement).toBeInTheDocument();
  });

  test('testing stars', () => {
    // jest.mock('axios', () => jest.fn(() => Promise.resolve({ data: 'data' })));
    // jest.mock('axios', () => ({
    //   get: () => Promise.resolve({ data: 'data' }),
    // }));
    // jest.mock('axios')
    //   , () => ({
    //     ...jest.requireActual('axios'),
    //     post: jest.fn(),
    //     get: jest.fn(),
    //     delete: jest.fn(),
    //   }));
    const company = {
      id: 1,
      name: 'Testname',
      categories: [1, 2],
      region: 'Testregion',
      founded: 2005,
      service_info: 'Testinfo',
      address: 'Testadress',
      banner_image: '',
    };
    jest.mock('axios');

    async () => {
      await axios.get.mockResolvedValue({
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

    async () => {
      await axios.post.mockResolvedValue({
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
});
