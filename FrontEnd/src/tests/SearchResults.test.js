import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import SearchResults from '../components/SearchPage/search_field/SearchResults';

afterEach(cleanup);

describe('SearchResults component unit tests', () => {
  test('renders search results', () => {
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
        banner_image: null,
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
        banner_image: null,
      },
      {
        id: 4,
        name: 'salefruits',
        categories: [],
        region: null,
        founded: null,
        service_info: null,
        address: null,
        banner_image: null,
      },
      {
        id: 5,
        name: 'salevegetables',
        categories: [],
        region: null,
        founded: null,
        service_info: null,
        address: null,
        banner_image: null,
      },
      {
        id: 6,
        name: 'salebushes',
        categories: [],
        region: null,
        founded: null,
        service_info: null,
        address: null,
        banner_image: null,
      },
      {
        id: 7,
        name: 'GGGsale',
        categories: [],
        region: null,
        founded: null,
        service_info: null,
        address: null,
        banner_image: null,
      },
    ];

    const displayedResults = results.slice(0, 7);
    render(
      <MemoryRouter>
        <SearchResults
          results={results}
          displayedResults={displayedResults}
          isAuthorized={true}
        />
      </MemoryRouter>
    );
    const nameElement = screen.getAllByText(/sale/i, { exact: false });
    expect(nameElement).toHaveLength(results.length);
  });
});
