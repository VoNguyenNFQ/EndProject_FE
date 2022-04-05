// react-router components
// @mui material components
import { ThemeProvider } from "@mui/material/styles";
// Practise React React themes
import theme from "assets/theme";
import DashboardPage from "layouts/pages/admin-pages/DashboardPage";
import SignIn from "layouts/pages/authentication/sign-in";
import SignUp from "layouts/pages/authentication/sign-up";
import { Route, Routes } from "react-router-dom";
// Practise React React routes
import routes from "routes";
import ProductPage from './layouts/pages/admin-pages/ProductPage/index';
import SignInAdmin from './pages/AdminPages/SignInAdmin/index';


import CheckOutPage from "layouts/pages/landing-pages/check-out";

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
        <Route exact path="/admin" element={<DashboardPage />} />;
        <Route exact path="/admin/sign-in" element={<SignInAdmin />} />;
        <Route exact path="/admin/product" element={<ProductPage />} />;
       
        <Route exact path="/check-out" element={<CheckOutPage/>} />;

      </Routes>
    </ThemeProvider>
  );
}
