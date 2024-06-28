import { render, screen } from '@testing-library/react';
import App from './App_for_Router';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
