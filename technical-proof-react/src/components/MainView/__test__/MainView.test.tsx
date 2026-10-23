import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MainView from "../MainView";

describe("Componente MainView", () => {
  const mockItems = [
    { id: "1", text: "Item 1" },
    { id: "2", text: "Item 2" },
  ];

  const defaultProps = {
    items: mockItems,
    historyLength: 0,
    onDeleteItems: jest.fn(),
    onUndo: jest.fn(),
    onNavigateToAdd: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza los elementos de la lista correctamente", () => {
    render(<MainView {...defaultProps} />);

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("selecciona y deselecciona un elemento al hacer clic", () => {
    render(<MainView {...defaultProps} />);

    const item = screen.getByText("Item 1");

    fireEvent.click(item);
    expect(item).toHaveClass("selected");

    fireEvent.click(item);
    expect(item).not.toHaveClass("selected");
  });

  it("llama a onDeleteItems con el ID al hacer doble clic en un elemento", () => {
    render(<MainView {...defaultProps} />);

    const item = screen.getByText("Item 1");
    fireEvent.doubleClick(item);

    expect(defaultProps.onDeleteItems).toHaveBeenCalledWith(["1"]);
  });

  it("llama a onDeleteItems al hacer clic en delete con elementos seleccionados", () => {
    render(<MainView {...defaultProps} />);

    const item = screen.getByText("Item 1");
    fireEvent.click(item);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(defaultProps.onDeleteItems).toHaveBeenCalledWith(["1"]);
  });

  it("llama a onNavigateToAdd al hacer clic en el botón add", () => {
    render(<MainView {...defaultProps} />);

    const addButton = screen.getByRole("button", { name: /add/i });
    fireEvent.click(addButton);

    expect(defaultProps.onNavigateToAdd).toHaveBeenCalledTimes(1);
  });
});
