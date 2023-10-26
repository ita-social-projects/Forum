import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CookieMod from '../components/cookieacception/CookieMod';

afterEach(cleanup);

describe('CookieMod component unit tests', () => {
  test('renders agry button', () => {
    render(
      <MemoryRouter>
        <CookieMod active={true} />
      </MemoryRouter>
    );
    const buttonElement = screen.getByText(/Погоджуюсь/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders deny button', () => {
    render(
      <MemoryRouter>
        <CookieMod active={true} />
      </MemoryRouter>
    );
    const buttonElement = screen.getByText(/Відмовляюсь/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders cookiepolicy link', async () => {
    render(
      <MemoryRouter>
        <CookieMod active={true} />
      </MemoryRouter>
    );
    const linkElement = screen.getByText(/про кукі-файли/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/cookies-policy');
  });
});
