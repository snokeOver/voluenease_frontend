import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const MainLayouts = () => {
  return (
    <div className="font-lato">
      <Header />
      <div className="min-h-[calc(100vh-500px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayouts;
