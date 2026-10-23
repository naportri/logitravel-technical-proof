import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddView from "../AddView";

describe("Componente AddView", () => {
  const defaultProps = {
    onAdd: jest.fn(),
    onCancel: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el input y los botones correctamente", () => {
    render(<AddView {...defaultProps} />);

    expect(screen.getByText("Add item to list")).toBeInTheDocument();
    expect(screen.getByLabelText("Text content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("habilita el botón add cuando se escribe texto válido", () => {
    render(<AddView {...defaultProps} />);

    const input = screen.getByLabelText("Text content");
    fireEvent.change(input, { target: { value: "Nuevo item" } });

    const addButton = screen.getByRole("button", { name: /add/i });
    expect(addButton).toBeEnabled();
  });

  it("llama a onAdd al hacer clic en add", () => {
    render(<AddView {...defaultProps} />);

    const input = screen.getByLabelText("Text content");
    fireEvent.change(input, { target: { value: "   Texto de prueba   " } });

    const addButton = screen.getByRole("button", { name: /add/i });
    fireEvent.click(addButton);

    expect(defaultProps.onAdd).toHaveBeenCalledWith("Texto de prueba");
  });

  it("llama a onCancel al hacer clic en cancel", () => {
    render(<AddView {...defaultProps} />);

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });
});
