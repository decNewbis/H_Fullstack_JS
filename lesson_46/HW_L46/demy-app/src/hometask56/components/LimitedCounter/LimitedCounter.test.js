import { render, screen, fireEvent } from '@testing-library/react';
import { LimitedCounter } from './LimitedCounter';

describe('LimitedCounter', () => {
  it('should render counter and buttons with initial state', () => {
    render(<LimitedCounter max={3} />);
    const displayCount = screen.getByTestId("displayCount");
    const incrementButton = screen.getByTestId("incrementButton");
    const decrementButton = screen.getByTestId("decrementButton");

    expect(displayCount).toBeInTheDocument();
    expect(displayCount).toHaveTextContent(/count: 0/i);

    expect(incrementButton).toBeInTheDocument();
    expect(incrementButton).toBeEnabled();

    expect(decrementButton).toBeInTheDocument();
    expect(decrementButton).toBeDisabled();
  });

  it('should increment the count', () => {
    render(<LimitedCounter max={3} />);
    const displayCount = screen.getByTestId("displayCount");
    const incrementButton = screen.getByTestId("incrementButton");

    fireEvent.click(incrementButton);
    expect(displayCount).toHaveTextContent(/count: 1/i);
  });

  it('should decrement the count', () => {
    render(<LimitedCounter max={3} />);
    const displayCount = screen.getByTestId("displayCount");
    const incrementButton = screen.getByTestId("incrementButton");
    const decrementButton = screen.getByTestId("decrementButton");

    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(decrementButton);

    expect(displayCount).toHaveTextContent(/count: 1/i);
  });

  it( 'should disable increment button when count reaches max', () => {
    render(<LimitedCounter max={3} />);
    const displayCount = screen.getByTestId("displayCount");
    const incrementButton = screen.getByTestId("incrementButton");

    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);

    expect(displayCount).toHaveTextContent(/count: 3/i);
    expect(incrementButton).toBeDisabled();
  });

  it('should enable increment and decrement buttons correctly', () => {
    render(<LimitedCounter max={3} />)
    const displayCount = screen.getByTestId("displayCount");
    const incrementButton = screen.getByTestId("incrementButton");
    const decrementButton = screen.getByTestId("decrementButton");

    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);

    expect(decrementButton).toBeEnabled();

    fireEvent.click(decrementButton);

    expect(displayCount).toHaveTextContent(/count: 1/i);
    expect(incrementButton).toBeEnabled();
    expect(decrementButton).toBeEnabled();

  });
});