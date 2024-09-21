import "@mantine/core/styles.css";
import { Route, Routes } from "react-router-dom";
import useAuth from "./global/hooks/useAuth";
import useScrollToTop from "./global/hooks/useScrollToTop";
import routes from "./routes/app.routes";
import AuthLayout from "./components/layouts/AuthLayout";

export default function App() {
  useScrollToTop();
  const { authState } = useAuth();

  const adminRoutes = routes.filter((route) => route.layout === "private");
  const guestRoutes = routes.filter((route) => route.layout === "guest");

  return (
    <Routes>
      {!authState.isLoggedIn && (
        <Route element={<AuthLayout />}>
          {guestRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Route>
      )}
      {authState.isLoggedIn && (
        <Route element={<AuthLayout />}>
          {adminRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Route>
      )}
    </Routes>
  );
}
