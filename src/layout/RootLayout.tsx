import { Outlet, useLocation } from "react-router-dom";
import CommonHeader from "../components/CommonHeader";
import HomeHeader from "../components/HomeHeader";

function RootLayout() {
  const location = useLocation();
  const isHome = location.pathname == '/';

  return (
    <div>
      {isHome ? <HomeHeader /> : <CommonHeader />}
      <Outlet />
    </div>
  );
}

export default RootLayout;