import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterCounter } from './CharacterCounter';

describe('CharacterCounter', () => {
  it('should renders textarea and charCount', () => {
    render(<CharacterCounter />);
    const textarea = screen.getByTestId("textarea");
    const charCount = screen.getByTestId("charCount");
    expect(textarea).toBeInTheDocument();
    expect(charCount).toBeInTheDocument();
  });

  it('should render charCount with default charCount', () => {
    render(<CharacterCounter />);
    const charCount = screen.getByTestId("charCount");
    expect(charCount).toHaveTextContent(/character count: 0/i);
  });

  it('should updates the charCount as text is entered', () => {
    render(<CharacterCounter />);
    const textarea = screen.getByTestId("textarea");
    fireEvent.change(textarea, { target: { value: 'Hillel' } });
    const charCount = screen.getByTestId("charCount");
    expect(charCount).toHaveTextContent(/character count: 6/i);
  });
});