import { useSelector, useDispatch } from "react-redux";
import calendarApi from "../apis/calendarApi";
export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async (email, password) => {
    console.log({ email, password });

    try {
      const resp = await calendarApi.post("/auth", { email, password });
      console.log({ resp });
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    status,
    user,
    errorMessage,
    // Method
    startLogin,
  };
};
