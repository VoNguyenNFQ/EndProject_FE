// @mui material components
import Icon from "@mui/material/Icon";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// Pages
import AboutUs from "layouts/pages/landing-pages/about-us";
import ProductDetail from "layouts/pages/landing-pages/product-detail";
import ProductList from "layouts/pages/landing-pages/product-list";
import ShoppingCart from "layouts/pages/landing-pages/shopping-cart";


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
      }
      
    ],
  },
  {
    icon: <ShoppingCartIcon></ShoppingCartIcon>,
    columns: 1,
    rowsPerColumn: 2,
    route: "/shopping-cart",
    component: <ShoppingCart />,
  }
  
];

export default routes;
