import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAVBAR = () => {
  const token = localStorage.getItem('token');
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const pathMap = {
    "/": { index: 0, name: "Home" },
    "/intern": { index: 1, name: "Internship Opps" },
    "/scholar": { index: 2, name: "Scholarship Opps" },
    "/fyp": { index: 3, name: "FYP" },
    "/profile": { index: 4, name: "Profile" },
  };

  const currentPage = pathMap[location.pathname]?.index ?? 5;

  useEffect(() => {
    sessionStorage.setItem("count", currentPage);
  }, [currentPage]);

  return token ? (
    <>
      <nav className="flex justify-between items-center p-4 bg-white text-black shadow-md">
        <div className="text-xl font-bold">Logo</div>

        <div className="hidden md:flex space-x-6">
          {Object.entries(pathMap).map(([path, { index, name }]) => (
            <Link
              key={path}
              to={path}
              className={`${currentPage === index ? "border-b-2" : "border-none "} py-2 hover:text-gray-600 `}
            >
              {name}
            </Link>
          ))}
        </div>
        <button onClick={() => setIsOpen(true)} className="md:hidden text-black text-2xl">
          ☰
        </button>

        <div className={`fixed right-0 top-0 h-full w-64 bg-gray-900 text-white transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out shadow-lg`}>
          <div className="p-4 flex justify-between items-center">
            <span className="text-lg font-bold">Menu</span>
            <button onClick={() => setIsOpen(false)} className="text-2xl">
              ✖
            </button>
          </div>

          <div className="flex flex-col space-y-4 p-4">
            {Object.entries(pathMap).map(([path, { name }]) => (
              <Link key={path} to={path} onClick={() => setIsOpen(false)} className="hover:text-gray-400">
                {name}
              </Link>
            ))}
            <hr className="border-gray-700" />
          </div>
        </div>
      </nav>
    </>
  ) : 
  (
    <>
      <nav className="flex justify-between items-center p-4 bg-white text-black shadow-md">
        <div className="text-xl font-bold">Logo</div>

        <div className="hidden md:flex space-x-6">
          {Object.entries(pathMap).map(([path, { index, name }]) => (
            <Link
              key={path}
              to={path}
              className={`${currentPage === index ? "border-b-2" : "border-none "} py-2 hover:text-gray-600 `}
            >
              {name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex gap-5">
          <button className="bg-[#CB1EDBD9] text-white px-4 py-2 rounded-lg hover:bg-[#CB1EDBD5]">
            <Link to="/signup">Join</Link>
          </button>
          <button className="bg-[#CB1EDBD9] text-white px-4 py-2 rounded-lg hover:bg-[#CB1EDBD5]">
            <Link to="/login">Log-In</Link>
          </button>
        </div>

        <button onClick={() => setIsOpen(true)} className="md:hidden text-black text-2xl">
          ☰
        </button>

        <div className={`fixed right-0 top-0 h-full w-64 bg-gray-900 text-white transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out shadow-lg`}>
          <div className="p-4 flex justify-between items-center">
            <span className="text-lg font-bold">Menu</span>
            <button onClick={() => setIsOpen(false)} className="text-2xl">
              ✖
            </button>
          </div>

          <div className="flex flex-col space-y-4 p-4">
            {Object.entries(pathMap).map(([path, { name }]) => (
              <Link key={path} to={path} onClick={() => setIsOpen(false)} className="hover:text-gray-400">
                {name}
              </Link>
            ))}
            <hr className="border-gray-700" />
            <Link to="/signup" onClick={() => setIsOpen(false)} className="bg-[#CB1EDBD9] text-white px-4 py-2 rounded-lg text-center">
              Join
            </Link>
            <Link to="/login" onClick={() => setIsOpen(false)} className="bg-[#CB1EDBD9] text-white px-4 py-2 rounded-lg text-center">
              Log-In
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NAVBAR;
