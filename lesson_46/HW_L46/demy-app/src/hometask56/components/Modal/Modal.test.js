import {render, screen, fireEvent, getByRole, queryByTestId, queryByRole} from "@testing-library/react";
import { Modal } from "./Modal";

describe("Modal", () => {
  it('should renders a button to open the modal', () => {
    render(<Modal />);
    const toggleModalButton = screen.getByRole("button", {name: /open modal/i});
    expect(toggleModalButton).toBeInTheDocument();
  });

  it('should open and display the modal when open button is clicked', () => {
    render(<Modal />);
    const toggleModalButton = screen.getByTestId("toggleModalButton");
    fireEvent.click(toggleModalButton);
    const modalDialog = screen.getByRole("dialog");
    const closeModalButton = screen.getByTestId("closeModalButton");
    expect(modalDialog).toBeInTheDocument();
    expect(closeModalButton).toBeInTheDocument();
  });

  it('should close the modal when the close button inside the modal is clicked', () => {
    render(<Modal />);
    const toggleModalButton = screen.getByTestId("toggleModalButton");
    fireEvent.click(toggleModalButton);
    const closeModalButton = screen.getByTestId("closeModalButton");
    fireEvent.click(closeModalButton);
    const modalDialog = screen.queryByRole("dialog");
    expect(modalDialog).not.toBeInTheDocument();
  });

  it('should close the modal when the toggleModalButton is clicked', () => {
    render(<Modal />);
    const toggleModalButton = screen. getByTestId("toggleModalButton");
    fireEvent.click(toggleModalButton);
    fireEvent.click(toggleModalButton);
    const modalDialog = screen.queryByRole("dialog");
    expect(modalDialog).not.toBeInTheDocument();
  });

  it('should toogles state close/open toggleModalButton click', () => {
    render(<Modal />);
    const toggleModalButton = screen.getByTestId("toggleModalButton");
    expect(toggleModalButton).toHaveTextContent(/open modal/i);
    fireEvent.click(toggleModalButton);
    expect(toggleModalButton).toHaveTextContent(/close modal/i);
  });
});