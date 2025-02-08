import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import { useEffect } from "react";


function App() {
  useEffect(() => {
    localStorage.clear();
  }, []);
  const token = localStorage.getItem('token');
  return token ? <PrivateRoutes/> : <PublicRoutes/>;
}

export default App;

