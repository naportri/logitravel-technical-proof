import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextManagerView from "../TextManagerView";

describe("Componente TextManagerView", () => {
  it("renderiza la vista principal con los elementos iniciales", () => {
    render(<TextManagerView />);

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 4")).toBeInTheDocument();
  });

  it("navega a la vista de agregar al hacer clic en el botón ADD", () => {
    render(<TextManagerView />);

    const addButton = screen.getByRole("button", { name: /^add$/i });
    fireEvent.click(addButton);

    expect(screen.getByText(/add item to list/i)).toBeInTheDocument();
  });

  it("agrega un nuevo elemento y regresa a la vista principal", async () => {
    render(<TextManagerView />);

    const navigateAddButton = screen.getByRole("button", { name: /^add$/i });
    fireEvent.click(navigateAddButton);

    const input = screen.getByPlaceholderText(/type the text here.../i);
    fireEvent.change(input, { target: { value: "Nuevo elemento de prueba" } });

    const submitButton = screen.getByRole("button", { name: /^add$/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Nuevo elemento de prueba")).toBeInTheDocument();
    });
  });
});
