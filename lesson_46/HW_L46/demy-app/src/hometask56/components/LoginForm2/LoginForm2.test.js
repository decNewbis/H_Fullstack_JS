import { render, screen, fireEvent } from "@testing-library/react";
import { LoginForm2 } from "./LoginForm2";

describe('LoginForm', () => {
  it('should renders the form with username, password and submit button', () => {
    render(<LoginForm2 onLogin={jest.fn()} />);
    const usernameInput = screen.getByTestId("usernameInput");
    const passwordInput = screen.getByTestId("passwordInput");
    const submitButton = screen.getByTestId("submitButton");
    const errorMessage = screen.queryByTestId("errorMessage");
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(errorMessage).not.toBeInTheDocument();
  });

  it('should updates username and password state on input change', () => {
    render(<LoginForm2 onLogin={jest.fn()} />);
    const usernameInput = screen.getByTestId("usernameInput");
    const passwordInput = screen.getByTestId("passwordInput");

    fireEvent.change(usernameInput, { target: { value: "alibaba" }});
    fireEvent.change(passwordInput, { target: { value: "_alibaba#89" }});

    expect(usernameInput.value).toBe("alibaba");
    expect(passwordInput.value).toBe("_alibaba#89");
  });

  it('should calls onLogin with username and password when the form submitted', () => {
    const onLogin = jest.fn();
    render(<LoginForm2 onLogin={onLogin} />);
    const usernameInput = screen.getByTestId("usernameInput");
    const passwordInput = screen.getByTestId("passwordInput");
    const submitButton = screen.getByTestId("submitButton");

    fireEvent.change(usernameInput, { target: { value: "alibaba" }});
    fireEvent.change(passwordInput, { target: { value: "_alibaba#89" }});
    fireEvent.click(submitButton);

    const errorMessage = screen.queryByTestId("errorMessage");
    expect(onLogin).toHaveBeenCalledWith({ username: "alibaba", password: "_alibaba#89" });
    expect(errorMessage).not.toBeInTheDocument();
  });

  it('should shows an error message when trying to submit with empty all fields', () => {
    const onLogin = jest.fn();
    render(<LoginForm2 onLogin={onLogin} />);
    const submitButton = screen.getByTestId("submitButton");

    fireEvent.click(submitButton);
    const errorMessage = screen.queryByTestId("errorMessage");
    expect(errorMessage).toHaveTextContent(/username and password are required/i);
    expect(onLogin).not.toHaveBeenCalled();

    const usernameInput = screen.getByTestId("usernameInput");
    fireEvent.change(usernameInput, { target: { value: "alibaba" }});
    fireEvent.click(submitButton);
    expect(errorMessage).toHaveTextContent(/username and password are required/i);
    expect(onLogin).not.toHaveBeenCalled();


    const passwordInput = screen.getByTestId("passwordInput");
    fireEvent.change(passwordInput, { target: { value: "_alibaba#89" }});
    fireEvent.click(submitButton);
    expect(errorMessage).toHaveTextContent(/username and password are required/i);
    expect(onLogin).not.toHaveBeenCalled();
  });

  it('should shows an error message when trying to submit with empty password field', () => {
    const onLogin = jest.fn();
    render(<LoginForm2 onLogin={onLogin} />);
    const submitButton = screen.getByTestId("submitButton");
    const usernameInput = screen.getByTestId("usernameInput");

    fireEvent.change(usernameInput, { target: { value: "alibaba" }});
    fireEvent.click(submitButton);
    const errorMessage = screen.getByTestId("errorMessage");
    expect(errorMessage).toHaveTextContent(/username and password are required/i);
    expect(onLogin).not.toHaveBeenCalled();
  });

  it('should shows an error message when trying to submit with empty username field', () => {
    const onLogin = jest.fn();
    render(<LoginForm2 onLogin={onLogin} />);
    const submitButton = screen.getByTestId("submitButton");
    const passwordInput = screen.getByTestId("passwordInput");
    
    fireEvent.change(passwordInput, { target: { value: "_alibaba#89" }});
    fireEvent.click(submitButton);
    const errorMessage = screen.queryByTestId("errorMessage");
    expect(errorMessage).toHaveTextContent(/username and password are required/i);
    expect(onLogin).not.toHaveBeenCalled();
  });

  it('should clears error message when the form submitted successfully', () => {
    const onLogin = jest.fn();
    render(<LoginForm2 onLogin={onLogin} />);
    const usernameInput = screen.getByTestId("usernameInput");
    const passwordInput = screen.getByTestId("passwordInput");
    const submitButton = screen.getByTestId("submitButton");

    fireEvent.click(submitButton);
    let errorMessage = screen.getByTestId("errorMessage");
    expect(errorMessage).toHaveTextContent(/username and password are required/i);

    fireEvent.change(usernameInput, { target: { value: "alibaba" }});
    fireEvent.change(passwordInput, { target: { value: "_alibaba#89" }});
    fireEvent.click(submitButton);
    errorMessage = screen.queryByTestId("errorMessage");
    expect(onLogin).toHaveBeenCalledWith({ username: "alibaba", password: "_alibaba#89" });
    expect(errorMessage).not.toBeInTheDocument();
  });
});