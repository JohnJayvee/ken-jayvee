import React, { Suspense, lazy, useEffect } from "react";
import { useRoutes, useLocation } from "react-router-dom";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";
import GoTop from "./components/GoTopButton/GoTop.jsx";
// import Home from './pages/Home.jsx';
// import Shop from "../src/pages/Shop.jsx";
// import AboutUs from "../src/pages/AboutUs.jsx";
// import LoginPage from '../src/pages/Login.jsx';
// import Cart from "./components/Cart.jsx";
// import Checkout from "./components/Checkout.jsx";
// import Register from "./pages/Register.jsx";
// import FeedbackForm from './components/Feedback/FeedbackForm.jsx';
// import FeedbackPage from "./pages/FeedbackPage.jsx";
// import UserFeedbackPage from "./pages/UserFeedbackPage.jsx";

const LoginPage = lazy(() => import("../src/pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const Shop = lazy(() => import("../src/pages/Shop.jsx"));
const AboutUs = lazy(() => import("../src/pages/AboutUs.jsx"));
const Cart = lazy(() => import("./components/Cart.jsx"));
const Checkout = lazy(() => import("./components/Checkout.jsx"));
const FeedbackPage = lazy(() => import("./pages/FeedbackPage.jsx"));
const UserFeedbackPage = lazy(() => import("./pages/UserFeedbackPage.jsx"));

const routes = [
  { path: "/", exact: true, title: "Home", element: <Home /> },
  { path: "/home", exact: true, title: "Home", element: <Home /> },
  { path: "/shop", exact: true, title: "Shop", element: <Shop /> },
  { path: "/aboutUs", title: "About", element: <AboutUs /> },
  { path: "/feedback", title: "Feedback", element: <FeedbackPage /> },
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
        <Suspense>{element}</Suspense>

        <GoTop />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
