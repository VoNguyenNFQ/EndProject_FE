// @mui material components
import Icon from "@mui/material/Icon";
import SignIn from "layouts/pages/authentication/sign-in";
// Pages
import AboutUs from "layouts/pages/landing-pages/about-us";
import ProductDetail from "layouts/pages/landing-pages/product-detail";
import ProductList from "layouts/pages/landing-pages/product-list";

const routes = [
  {
    name: "pages",
    icon: <Icon>dashboard</Icon>,
    columns: 1,
    rowsPerColumn: 2,
    collapse: [
      {
        name: "landing pages",
        collapse: [
          {
            name: "Home",
            route: "/",
            component: <AboutUs />,
          },
          {
            name: "about us",
            route: "/about-us",
            component: <AboutUs />,
          },
          {
            name: "Product",
            route: "/product-list",
            component: <ProductList />,
            collapse: [
              {
                name: "product list",
                route: "/product-list",
                component: <ProductList />,
              },
              {
                name: "product detail",
                route: "/product-list/:id",
                component: <ProductDetail />,
              }
            ]
          },
        ],
      },
      {
        name: "account",
        collapse: [
          {
            name: "sign in",
            route: "/pages/authentication/sign-in",
            component: <SignIn />,
          },
        ],
      },
    ],
  }
];

export default routes;
