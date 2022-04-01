// react-router components
import { Routes, Route } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";

// Practise React React themes
import theme from "assets/theme";

// Practise React React routes
import routes from "routes";
import SignIn from "layouts/pages/authentication/sign-in";
import SignUp from "layouts/pages/authentication/sign-up";
import AdminPages from "layouts/pages/admin-pages";
export default function App() {

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {getRoutes(routes)}
        <Route exact path="/sign-in" element={<SignIn />} />;
        <Route exact path="/sign-up" element={<SignUp />} />;
        <Route exact path="/admin" element={<AdminPages />} />;
      </Routes>
    </ThemeProvider>
  );
}
