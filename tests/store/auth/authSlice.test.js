import {
  authSlice,
  clearErrorMessage,
  onLogin,
  onLogout,
} from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe("test authSlice", () => {
  test("debe de regresar el estado por defecto", () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });
  test("debe de hacer el login", () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials));

    expect(state).toEqual({
      status: "authenticated",
      user: testUserCredentials,
      errorMessage: undefined,
    });
  });

  test("debe de hacer el logout", () => {
    const state = authSlice.reducer(authenticatedState, onLogout());

    expect(state).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: undefined,
    });
  });

  test("debe de mostrar el mensaje de error en logout", () => {
    const errorMessage = "Credenciales incorrectas";
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    expect(state.errorMessage).toBe(errorMessage);
  });

  test("debe de limpiar el mensaje de error en logout", () => {
    const errorMessage = "Credenciales no validas";
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    const newState = authSlice.reducer(state, clearErrorMessage());
    expect(newState.errorMessage).toBe(undefined);
  });
});
