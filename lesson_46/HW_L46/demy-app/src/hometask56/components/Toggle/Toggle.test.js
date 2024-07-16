import { render, screen, fireEvent } from "@testing-library/react";
import { Toggle } from "./Toggle";

describe('Toggle', () => {
  it('should render with initial state OFF', () => {
    render(<Toggle />);
    const toggleMessage = screen.getByTestId("toggleMessage");
    expect(toggleMessage).toBeInTheDocument();
    expect(toggleMessage).toHaveTextContent("The switch is OFF");

    const toggleButton = screen.getByTestId("toggleButton");
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveTextContent("Turn ON");
  });

  it('should toggle state ON/OFF button click', () => {
    render(<Toggle />);
    const toggleButton = screen.getByTestId("toggleButton");
    fireEvent.click(toggleButton);

    const toggleMessage = screen.getByTestId("toggleMessage");
    expect(toggleMessage).toHaveTextContent("The switch is ON");
    expect(toggleButton).toHaveTextContent("Turn OFF");

    fireEvent.click(toggleButton);

    expect(toggleMessage).toHaveTextContent("The switch is OFF");
    expect(toggleButton).toHaveTextContent("Turn ON");
  });
});