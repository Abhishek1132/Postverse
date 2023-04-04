import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogin, handleLogout } from "../../features/auth/authSlice";

const Authenticate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      const { user, token } = userData;
      if (user && token) {
        dispatch(handleLogin({ user, token }));
        return;
      }
      localStorage.removeItem("userData");
    }
    dispatch(handleLogout());
    navigate("/");
  }, []);
  return <></>;
};

export default Authenticate;
