import Navbar from "./Navbar";

const Header = () => {
  return (
    <div className="absolute top-0 z-10 w-full backdrop-blur-sm bg-opacity-10">
      <div className="container mx-auto">
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
