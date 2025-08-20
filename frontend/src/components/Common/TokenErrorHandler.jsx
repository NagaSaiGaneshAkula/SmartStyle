import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { validateToken, clearTokenError } from '../../redux/slices/authSlice';

const TokenErrorHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, tokenError } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check for session expiration message
    const message = searchParams.get('message');
    if (message === 'session-expired') {
      alert('Your session has expired. Please log in again.');
      // Or show a toast notification instead
      dispatch(clearTokenError());
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    // Validate token on app load if user exists in localStorage
    const storedUser = localStorage.getItem("userInfo");
    const storedToken = localStorage.getItem("userToken");
    
    if (storedUser && storedToken && !user) {
      dispatch(validateToken());
    }
  }, [dispatch, user]);

  useEffect(() => {
    // Handle token errors
    if (tokenError && window.location.pathname !== '/login') {
      navigate('/login?message=session-expired');
    }
  }, [tokenError, navigate]);

  return null; // This component doesn't render anything
};

export default TokenErrorHandler;