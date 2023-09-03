import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../../../src/calendar/components/FabDelete";
import { useCalendarStore } from "../../../../src/hooks/useCalendarStore";

jest.mock("../../../../src/hooks/useCalendarStore");

describe("Pruebas en <FabDelete/>", () => {
  const mockStartDeletingEvent = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test("debe de mostrar el componente correctamente", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: false,
    });

    render(<FabDelete />);
    // screen.debug();
    const btn = screen.getByLabelText("btn-delete");
    expect(btn.classList.contains("fab-danger")).toBeTruthy();
    expect(btn.style.display).toBe("none");
    expect(btn.children.length).toBe(1);
    expect(btn.children[0].classList.contains("fas")).toBeTruthy();
    expect(btn.children[0].classList.contains("fa-trash-alt")).toBeTruthy();
  });

  test("debe de mostrar el boton si hay evento seleccionado", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
    });

    render(<FabDelete />);
    // screen.debug();
    const btn = screen.getByLabelText("btn-delete");

    expect(btn.style.display).toBe("");
  });

  test("debe de llamar startDeletingEvent si hay evento seleccionado", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
      startDeletingEvent: mockStartDeletingEvent,
    });

    render(<FabDelete />);
    // screen.debug();
    const btn = screen.getByLabelText("btn-delete");
    fireEvent.click(btn);
    expect(mockStartDeletingEvent).toHaveBeenCalled();
  });
});
