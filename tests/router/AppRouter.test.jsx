import { render, screen } from '@testing-library/react';
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";
import { MemoryRouter } from 'react-router-dom';
import { CalendarPage } from '../../src/calendar/pages/CalendarPage';

jest.mock("../../src/hooks/useAuthStore");
jest.mock("../../src/calendar/pages/CalendarPage", () => ({
  CalendarPage: () => <h1>CalendarPage</h1>
}));

describe('Pruebas en <AppRouter/>', () => {
  const mockCheckAuthToken = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("debe de mostrar la pantalla de carga y llamar checkAuthToken", () => {
    useAuthStore.mockReturnValue({
      status: "checking",
      checkAuthToken: mockCheckAuthToken,
    });
    render(<AppRouter />);
    // screen.debug();
    expect(screen.getByText("Loading...")).toBeTruthy();
    expect(mockCheckAuthToken).toHaveBeenCalled();
  });

  test("debe de mostrar el login si no esta autenticado", () => {
    useAuthStore.mockReturnValue({
      status: "not-authenticated",
      checkAuthToken: mockCheckAuthToken,
    });
    render(<MemoryRouter>
      <AppRouter />
    </MemoryRouter>);
    // screen.debug();
    expect(screen.getByText("Login")).toBeTruthy();
    expect(mockCheckAuthToken).toHaveBeenCalled();
    expect(screen.queryByText("Calendar")).toBeFalsy();
    expect(screen.queryByText("New Event")).toBeFalsy();
    expect(screen.queryByText("Logout")).toBeFalsy();
    expect(screen.queryByText("Delete Event")).toBeFalsy();
  });

  test("debe de mostrar el calendario si esta autenticado", () => {
    useAuthStore.mockReturnValue({
      status: "authenticated",
      checkAuthToken: mockCheckAuthToken,
    });
    render(<MemoryRouter>
      <AppRouter />
    </MemoryRouter>);
    // screen.debug();

    expect(screen.getByText("CalendarPage")).toBeTruthy();

  });

});