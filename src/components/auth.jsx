import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = (skipRedirect = false) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);

      if (!skipRedirect) {
        navigate("/login", { replace: true });
      }
    }
  }, [navigate, skipRedirect]);

  return isLoggedIn;
};

export default useAuth;
