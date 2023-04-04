import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Discoverpage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      navigate("/");
    }
  }, []);
  return (
    <>{ localStorage.getItem("userData") &&
        <div>DiscoverPage</div>
      }
    </>
  )
}

export default Discoverpage