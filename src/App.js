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
import ShoppingCart from "layouts/pages/landing-pages/shopping-cart";
import OrderManagementPage from "layouts/pages/landing-pages/order-management";
import OrderDetailPage from "layouts/pages/landing-pages/order-detail";
import CheckOutPage from "layouts/pages/landing-pages/check-out";
import PrivateRoutes from './components/PrivateRoute/index';

import NotFoundPage from "pages/NotFoundPage";
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
        <Route exact path="/admin" element={<PrivateRoutes><DashboardPage /></PrivateRoutes>} />;
        <Route exact path="/admin/sign-in" element={<SignInAdmin />} />;
        <Route exact path="/shopping-cart" element={<ShoppingCart />} />;
        <Route exact path="/admin/product" element={<PrivateRoutes><ProductPage /></PrivateRoutes>} />;

        <Route exact path="/check-out" element={<CheckOutPage />} />;
        {/* <Route path="*" element={<h1>NOT FOUND</h1>} />; */}

        <Route exact path="/sign-in" element={<SignIn />} />
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/check-out" element={<CheckOutPage/>} />
        
        <Route  path="/order-list" element={<OrderManagementPage/>} >
          <Route  path="/order-list/:id" element={<OrderDetailPage/>} />
        </Route>
        <Route path="*" element={<NotFoundPage/>} />;
      </Routes>
    </ThemeProvider>
  );
}
