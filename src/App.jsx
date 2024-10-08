import React, { Suspense, lazy, useEffect } from "react";
import { useRoutes, useLocation } from "react-router-dom";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";
import GoTop from "./components/GoTopButton/GoTop.jsx";

const LoginPage = lazy(() => import("../src/pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const Shop = lazy(() => import("../src/pages/Shop.jsx"));
const AboutUs = lazy(() => import("../src/pages/AboutUs.jsx"));
const Cart = lazy(() => import("./components/Cart.jsx"));
const Checkout = lazy(() => import("./components/Checkout.jsx"));
const FeedbackPage = lazy(() => import("./pages/FeedbackPage.jsx"));
const UserFeedbackPage = lazy(() => import("./pages/UserFeedbackPage.jsx"));
const ProductList = lazy(() => import("./pages/ProductList.jsx"));
const ShowUpdateModal = lazy(() =>
  import("./components/ProductList/ShowUpdateModal.jsx")
);

const routes = [
  { path: "/", exact: true, title: "Home", element: <Home /> },
  { path: "/home", exact: true, title: "Home", element: <Home /> },
  { path: "/shop", exact: true, title: "Shop", element: <Shop /> },
  { path: "/aboutUs", title: "About", element: <AboutUs /> },
  { path: "/feedback", title: "Feedback", element: <FeedbackPage /> },
  { path: "/productList", title: "ProductList", element: <ProductList /> },
  { path: "/login", title: "Login", element: <LoginPage /> },
  { path: "/register", title: "Register", element: <Register /> },
  {
    path: "/userfeedback",
    title: "User Feedback",
    element: <UserFeedbackPage />,
  },
];

const appName = "Pawgo Shop";

function App() {
  const location = useLocation();
  const element = useRoutes(routes);

  useEffect(() => {
    const currentRoute =
      routes.find((route) => route.path === location.pathname) ||
      routes.find((route) => route.path === "*");
    if (currentRoute) {
      document.title = `${currentRoute.title} | ${appName}`;
    }
  }, [location]);
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Cart />
        <Checkout />

        <ShowUpdateModal />
        <Suspense>{element}</Suspense>

        <GoTop />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
