import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/auth");
    }, 1000);
  }, [navigate]);
  return <div>Please wait a moment...</div>;
};

export default Authentication;
