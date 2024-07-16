import { render, screen, fireEvent } from "@testing-library/react";
import { LoginForm } from "./LoginForm";

describe('LoginForm', () => {
  it('should render the form with username, password and submit button', () => {
    render(<LoginForm onLogin={jest.fn()} />);
    const usernameInput = screen.getByTestId("usernameInput");
    const passwordInput = screen.getByTestId("passwordInput");
    const submitButton = screen.getByTestId("submitButton");
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should update username and password state on input change', () => {
    render(<LoginForm onLogin={jest.fn()} />);
    const usernameInput = screen.getByTestId("usernameInput");
    const passwordInput = screen.getByTestId("passwordInput");

    fireEvent.change(usernameInput, { target: { value: "alibaba" }});
    fireEvent.change(passwordInput, { target: { value: "_alibaba#89" }});

    expect(usernameInput.value).toBe("alibaba");
    expect(passwordInput.value).toBe("_alibaba#89");
  });

  it('should call onLogin with username and password when the form submitted', () => {
    const onLogin = jest.fn();
    render(<LoginForm onLogin={onLogin} />);
    const usernameInput = screen.getByTestId("usernameInput");
    const passwordInput = screen.getByTestId("passwordInput");
    const submitButton = screen.getByTestId("submitButton");

    fireEvent.change(usernameInput, { target: { value: "alibaba" }});
    fireEvent.change(passwordInput, { target: { value: "_alibaba#89" }});
    fireEvent.click(submitButton);

    expect(onLogin).toHaveBeenCalledWith({ username: "alibaba", password: "_alibaba#89" });
  });
});