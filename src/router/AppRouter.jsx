import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { CalendarApp } from "../CalendarApp";

export const AppRouter = () => {
  const authStatus = "not-authenticated";//authenticated
  return (
    <Routes>
      {
        (authStatus === "not-authenticated")
          ?
          <Route path="/auth/*" element={<LoginPage />} />
          :
          <Route path="/*" element={<CalendarApp />} />

      }
      <Route path="/*" element={<Navigate to="/auth/login" replace={true} />} />

    </Routes>
  );
};
