import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogin, handleLogout } from "../../features/auth/authSlice";

const Authenticate = () => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      const { user, token } = userData;
      if (user && token) {
        if (!auth.user || !auth.token) dispatch(handleLogin({ user, token }));
        return;
      }
      localStorage.removeItem("userData");
    }
    dispatch(handleLogout());
    navigate("/");
  }, [navigate, dispatch]);
  return <></>;
};

export default Authenticate;
