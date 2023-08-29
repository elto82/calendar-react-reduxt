import { useSelector, useDispatch } from "react-redux";
import calendarApi from "../apis/calendarApi";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "../store/auth/authSlice";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async (email, password) => {
    // console.log({ email, password });

    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 100);
    }
  };

  const startRegister = async ({ email, password, name }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth/new", {
        email,
        password,
        name,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout(error.response.data?.msg || error.message));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 100);
    }
  };

  return {
    status,
    user,
    errorMessage,
    // Method
    startLogin,
    startRegister,
  };
};
