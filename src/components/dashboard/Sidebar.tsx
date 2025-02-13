import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UploadMenu from "./UploadMenu"; 

const icons: Icon[] = [
  { icon: "home", path: "" },
  { icon: "folder", path: "/myfiles" },
  { icon: "group", path: "/shared" },
  { icon: "star", path: "/starred" },
  { icon: "delete", path: "/trash" },
];
interface Icon {
  icon: string;
  path: string;
}

const Sidebar: React.FC = () => {
  const [isUploadMenuOpen, setIsUploadMenuOpen] = useState(false); 
  const location = useLocation(); 
  const isActive = (path: string): boolean => location.pathname === `/dashboard${path}`;

  const toggleUploadMenu = () => {
    setIsUploadMenuOpen(!isUploadMenuOpen);
  };

  return (
    <div className="relative h-screen w-16 bg-gray-100 dark:bg-gray-900 flex flex-col items-center py-4 space-y-4">
      <button
        onClick={toggleUploadMenu}
        className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center"
      >
        <i className="material-icons text-white text-2xl">add</i>
      </button>

      {isUploadMenuOpen && (
        <div className="absolute top-1 left-44">
          <UploadMenu isOpen={isUploadMenuOpen} toggleMenu={toggleUploadMenu} />
        </div>
      )}

      <div className="flex flex-col space-y-4 items-center">
        {icons.map((icon) => (
          <Link
            key={icon.path}
            to={`/dashboard${icon.path}`}
            className={`material-icons cursor-pointer ${
              isActive(icon.path) ? "text-blue-500" : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {icon.icon}
          </Link>
        ))}

        <div className="border-t border-gray-300 w-8 dark:border-gray-700"></div>

        <div className="mt-auto mb-2">
          <i className="material-icons text-gray-600 dark:text-gray-400">
            more_horiz
          </i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
