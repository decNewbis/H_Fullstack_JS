import { render, screen, fireEvent } from "@testing-library/react";
import { Dropdown } from "./Dropdown";

describe('Dropdown', () => {
  it('should renders element with options', () => {
    render(<Dropdown />);
    const selectElement = screen.getByTestId("selectElement");
    const options = screen.getAllByRole("option");
    const selectedItem = screen.queryByTestId("selectedItem");
    expect(selectElement).toBeInTheDocument();
    expect(options).toHaveLength(4);
    expect(selectedItem).not.toBeInTheDocument();
  });

  it('should renders the default "Select an option" as the initial value', () => {
    render(<Dropdown />);
    const selectElement = screen.getByTestId("selectElement");
    const defaultOption = screen.getByText(/Select an option/i);
    expect(selectElement.value).toBe('');
    expect(defaultOption).toBeInTheDocument();
  });

  it('should updates the selected value and display it', () => {
    render(<Dropdown />);
    const selectElement = screen.getByTestId("selectElement");

    fireEvent.change(selectElement, { target: { value: "Option 1" }});
    const selectedItem = screen.getByTestId("selectedItem");
    expect(selectElement.value).toBe("Option 1");
    expect(selectedItem).toBeInTheDocument();

    fireEvent.change(selectElement, { target: { value: "Option 2" }});
    expect(selectElement.value).toBe("Option 2");
    expect(selectedItem).toBeInTheDocument();

    fireEvent.change(selectElement, { target: { value: "Option 3" }});
    expect(selectElement.value).toBe("Option 3");
    expect(selectedItem).toBeInTheDocument();
  });
});