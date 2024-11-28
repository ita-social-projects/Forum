import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CookieMod from '../CookieMod';

afterEach(cleanup);

describe('CookieMod component unit tests', () => {
  test('renders "Allow" button', () => {
    render(
      <MemoryRouter>
        <CookieMod active={true} setActive={() => {}} />
      </MemoryRouter>
    );
    const buttonElement = screen.getByText(/Дозволити/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders "Decline" button', () => {
    render(
      <MemoryRouter>
        <CookieMod active={true} setActive={() => {}} />
      </MemoryRouter>
    );
    const buttonElement = screen.getByText(/Відмовитись/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders link to cookie policy', () => {
    render(
      <MemoryRouter>
        <CookieMod active={true} setActive={() => {}} />
      </MemoryRouter>
    );
    const linkElement = screen.getByText(/про файли cookie/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('does not render cookie banner when inactive', () => {
    render(
      <MemoryRouter>
        <CookieMod active={false} setActive={() => {}} />
      </MemoryRouter>
    );
    const cookieElement = screen.queryByTestId('cookiemodal');
    expect(cookieElement).not.toBeInTheDocument();
  });

  test('renders cookie banner when active', () => {
    render(
      <MemoryRouter>
        <CookieMod active={true} setActive={() => {}} />
      </MemoryRouter>
    );
    const cookieElement = screen.getByTestId('cookiemodal');
    expect(cookieElement).toBeInTheDocument();
  });
});
