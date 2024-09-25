import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CookieMod from '../CookieMod';

afterEach(cleanup);

describe('CookieMod component unit tests', () => {
  test('renders agree button', () => {
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
  });

  test('renders hidden cookie modal window', () => {
    render(
      <MemoryRouter>
        <CookieMod active={false} />
      </MemoryRouter>
    );
    const cookieElement = screen.queryByTestId('cookiemodal', { hidden: true });
    expect(cookieElement).toBeInTheDocument();
  });
});
