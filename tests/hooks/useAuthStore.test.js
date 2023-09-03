import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authSlice } from "../../src/store/auth/authSlice";
import { initialState, notAuthenticatedState } from "../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";
import calendarApi from "../../src/apis/calendarApi";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe("Pruebas en el useAuthStore", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("debe de regresar el estado inicial", () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    expect(result.current).toEqual({
      errorMessage: undefined,
      status: "checking",
      user: {},
      checkAuthToken: expect.any(Function),
      startLogin: expect.any(Function),
      startLogout: expect.any(Function),
      startRegister: expect.any(Function),
    });
  });

  test("startLogin debe de realizar el login correctamente", async () => {
    localStorage.clear();
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    // console.log(result.current.user);
    await act(async () => {
      await result.current.startLogin(testUserCredentials);
    });
    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { name: "Test User", uid: "64f2025f6ccc04998d8a8cfe" },
    });
    expect(localStorage.getItem("token")).toBeTruthy();
    expect(localStorage.getItem("token")).not.toBeNull();
    expect(localStorage.getItem("token")).not.toBeUndefined();
    expect(localStorage.getItem("token")).not.toEqual("");
  });

  test("starLogin debe de fallar la autenticación", async () => {
    localStorage.clear();
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin({
        email: "XXXXXXXXX@mail.com",
        password: "XXXXXX",
      });
    });
    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: "Credenciales incorrectas",
      status: "not-authenticated",
      user: {},
    });
    expect(localStorage.getItem("token")).toBeNull();
    await waitFor(() => expect(result.current.errorMessage).toBe(undefined));
  });

  test("startRegister debe de crear un nuevo usuario", async () => {
    const newUser = {
      email: "testUser2@mail.com",
      password: "1234567",
      name: "Test User2",
    };
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const spy = jest.spyOn(calendarApi, "post").mockReturnValue({
      data: {
        ok: true,
        uid: "123456789",
        name: "Test User2",
        token: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      },
    });

    await act(async () => {
      await result.current.startRegister(newUser);
    });
    const { errorMessage, status, user } = result.current;
    // console.log(errorMessage, status, user);
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { name: "Test User2", uid: "123456789" },
    });
    spy.mockRestore();
  });

  test("startRegister debe de fallar al crear un nuevo usuario", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startRegister(testUserCredentials);
    });
    const { errorMessage, status, user } = result.current;
    // console.log(errorMessage, status, user);
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: "El usuario ya existe",
      status: "not-authenticated",
      user: {},
    });
  });

  test("chaeckAuthToken debe fallar si no hay token ", async () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    await act(async () => {
      await result.current.checkAuthToken();
    });
    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "not-authenticated",
      user: {},
    });
  });

  test("checkAuthToken debe de autenticar si hay un token", async () => {
    const { data } = await calendarApi.post("/auth", testUserCredentials);
    localStorage.setItem("token", data.token);

    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { name: "Test User", uid: "64f2025f6ccc04998d8a8cfe" },
    });
  });
});
