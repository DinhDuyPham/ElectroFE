import { useLocation } from "react-router-dom";

import Admin from "./pages/Admin/Admin";
// import { useEffect } from "react";
import User from "./pages/User/User";

function App() {
  const location = useLocation();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (location.pathname.includes("/admin")) {
  //     navigate("/admin/login");
  //   }
  // }, [location.pathname]);

  if (location.pathname.includes("/admin")) {
    return <Admin />;
  }

  return <User />;
}

export default App;
