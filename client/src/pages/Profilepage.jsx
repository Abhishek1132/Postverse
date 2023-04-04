import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profilepage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      navigate("/");
    }
  }, []);
  return (
    <>{ localStorage.getItem("userData") &&
        <div>Profile Page</div>
      }
    </>
  )
}

export default Profilepage