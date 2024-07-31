import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!token) {
      navigate('/login', { replace: true });
    } else {
      setIsLoggedIn(true);

    }
  }, [navigate]);

  return isLoggedIn;
};

export default useAuth;