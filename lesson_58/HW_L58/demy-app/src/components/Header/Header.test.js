import {render, screen, fireEvent} from "@testing-library/react";
import { Header } from "./Header";
import {useVisibility} from "../../hooks";

jest.mock('../Navbar', () => (
  { Navbar: () => <div data-testid="navbar">Navbar</div> }
));
jest.mock('../NotificationLine', () => ({
  NotificationLine: ({ onClick }) => (
    <div data-testid="notificationLine">
      NotificationLine
      <button onClick={onClick} data-testid="toggleButton">Toggle</button>
    </div>
  ),
}));
jest.mock('../../hooks', () => ({
  useVisibility: jest.fn(),
}));

describe('Header', () => {
  it('should render Navbar and NotificationLine when NotificationLine is visible', () => {
    useVisibility.mockReturnValue([true, jest.fn()]);
    render(<Header />);
    const navbar = screen.getByTestId("navbar");
    const notificationLine = screen.getByTestId("notificationLine");

    expect(navbar).toBeInTheDocument();
    expect(notificationLine).toBeInTheDocument();
  });

  it('should render Navbar but not notificationLine when NotificationLine is not visible', () => {
    useVisibility.mockReturnValue([false, jest.fn()]);
    render(<Header />);
    const navbar = screen.getByTestId("navbar");
    const notificationLine = screen.queryByTestId("notificationLine");

    expect(navbar).toBeInTheDocument();
    expect(notificationLine).not.toBeInTheDocument();
  });

  it('should call toggleNotificationLineVisible when toggle button is clicked', () => {
    const toggleMock = jest.fn();
    useVisibility.mockReturnValue([true, toggleMock()]);
    render(<Header />);
    const toggleButton = screen.getByTestId("toggleButton");

    fireEvent.click(toggleButton);
    expect(toggleMock).toHaveBeenCalledTimes(1);
  });
});
