import Navbar from "./Navbar";

const Header = () => {
  return (
    <>
      <div className="bg-blue-100 dark:bg-gray-700 sticky top-0 z-50">
        <div className="container mx-auto">
          <Navbar />
        </div>
      </div>
    </>
  );
};

export default Header;