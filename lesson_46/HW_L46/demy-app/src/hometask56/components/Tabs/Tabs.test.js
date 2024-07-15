import { render, screen, fireEvent} from "@testing-library/react";
import { Tabs } from "./Tabs";

describe('Tabs', () => {
  it('should renders with initial state showing content of Tab 1', () => {
    render(<Tabs />);
    const tab1Button = screen.getByTestId("tab1Button");
    const tab2Button = screen.getByTestId("tab2Button");
    const tab3Button = screen.getByTestId("tab3Button");
    const tab1Content = screen.getByTestId("tab1Content");
    const tab2Content = screen.queryByTestId("tab2Content");
    const tab3Content = screen.queryByTestId("tab3Content");
    expect(tab1Button).toBeInTheDocument();
    expect(tab2Button).toBeInTheDocument();
    expect(tab3Button).toBeInTheDocument();
    expect(tab1Content).toBeInTheDocument();
    expect(tab2Content).not.toBeInTheDocument();
    expect(tab3Content).not.toBeInTheDocument();
  });

  it('should switch to Tab 2 when Tab 2 button is clicked', () => {
    render(<Tabs />);
    const tab2Button = screen.getByTestId("tab2Button");
    expect(tab2Button).toBeInTheDocument();

    fireEvent.click(tab2Button);

    const tab1Content = screen.queryByTestId("tab1Content");
    const tab2Content = screen.getByTestId("tab2Content");
    const tab3Content = screen.queryByTestId("tab3Content");
    expect(tab1Content).not.toBeInTheDocument();
    expect(tab2Content).toBeInTheDocument();
    expect(tab3Content).not.toBeInTheDocument();
  });

  it('should switch to Tab 3 when Tab 3 button is clicked', () => {
    render(<Tabs />);
    const tab3Button = screen.getByTestId("tab3Button");
    expect(tab3Button).toBeInTheDocument();

    fireEvent.click(tab3Button);

    const tab1Content = screen.queryByTestId("tab1Content");
    const tab2Content = screen.queryByTestId("tab2Content");
    const tab3Content = screen.getByTestId("tab3Content");
    expect(tab1Content).not.toBeInTheDocument();
    expect(tab2Content).not.toBeInTheDocument();
    expect(tab3Content).toBeInTheDocument();
  });

  it('should switch to Tab 1 when Tab 1 button is clicked after switcheng to Tab 3', () => {
    render(<Tabs />);
    const tab1Button = screen.getByTestId("tab1Button");
    const tab3Button = screen.getByTestId("tab3Button");
    expect(tab1Button).toBeInTheDocument();
    expect(tab3Button).toBeInTheDocument();

    fireEvent.click(tab3Button);
    fireEvent.click(tab1Button);

    const tab1Content = screen.getByTestId("tab1Content");
    const tab2Content = screen.queryByTestId("tab2Content");
    const tab3Content = screen.queryByTestId("tab3Content");
    expect(tab1Content).toBeInTheDocument();
    expect(tab2Content).not.toBeInTheDocument();
    expect(tab3Content).not.toBeInTheDocument();
  });
});