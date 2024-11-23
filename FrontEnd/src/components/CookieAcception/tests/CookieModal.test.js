import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CookieMod from '../CookieMod';

afterEach(cleanup);

describe('CookieMod component unit tests', () => {
  test('renders "Allow All" button', () => {
    render(
      <MemoryRouter>
        <CookieMod active={true} />
      </MemoryRouter>
    );
    const buttonElement = screen.getByText(/Дозволити всі/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders "Settings" button', () => {
    render(
      <MemoryRouter>
        <CookieMod active={true} />
      </MemoryRouter>
    );
    const buttonElement = screen.getByText(/Налаштувати/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders link to cookie policy', async () => {
    render(
      <MemoryRouter>
        <CookieMod active={true} />
      </MemoryRouter>
    );

    const linkElement = screen.getByText(/про файли cookie/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('does not render cookie modal when inactive', () => {
    render(
      <MemoryRouter>
        <CookieMod active={false} />
      </MemoryRouter>
    );
    const cookieElement = screen.queryByTestId('cookiemodal');
    expect(cookieElement).not.toBeInTheDocument();
  });

  test('renders cookie modal when active', () => {
    render(
      <MemoryRouter>
        <CookieMod active={true} />
      </MemoryRouter>
    );
    const cookieElement = screen.getByTestId('cookiemodal');
    expect(cookieElement).toBeInTheDocument();
  });
});
