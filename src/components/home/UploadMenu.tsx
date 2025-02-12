import React, { useRef } from "react";
import { FileUp, FolderUp, FolderPlus } from "lucide-react";
import useClickOutside from "../common/hooks/useClickOutside";

interface UploadMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const UploadMenu: React.FC<UploadMenuProps> = ({ isOpen, toggleMenu }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useClickOutside([menuRef, buttonRef], () => toggleMenu(), isOpen);

  const handleNewFolder = () => {
    console.log("New Folder option selected");
  };

  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true; // Allow multiple file selection
    input.onchange = (event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files) {
        console.log("Files selected:", files);
      }
    };
    input.click();
  };

  const handleFolderUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.webkitdirectory = true; // Allow folder selection
    input.multiple = false;
    input.onchange = (event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files) {
        console.log("Files selected:", files);
      }
    };
    input.click();
  };

  return (
    <div
      className="relative"
      onContextMenu={(e) => {
        e.preventDefault();
        toggleMenu();
      }}
    >
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        id="dropdownMenuIconButton"
        className="inline-flex items-center p-2 text-md font-medium text-center text-gray-900 dark:text-white focus:ring-gray-50"
        type="button"
      >
        {/* Button content (if needed) */}
      </button>
      <div
        ref={menuRef}
        id="dropdownDots"
        className={`absolute right-0 mt-2 z-50 w-36 bg-white dark:bg-gray-900 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 ${
          !isOpen ? "hidden" : ""
        }`}
      >
        <ul>
          <li>
            <button
              onClick={handleNewFolder}
              className="flex items-center w-full text-left px-4 py-2 text-xs text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out border-b border-gray-200 dark:border-gray-700"
            >
              <FolderPlus size={14} className="mr-2" />
              New Folder
            </button>
          </li>
          <li>
            <button
              onClick={handleFileUpload}
              className="flex items-center w-full text-left px-4 py-2 text-xs text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out border-b border-gray-200 dark:border-gray-700"
            >
              <FileUp size={14} className="mr-2" />
              File Upload
            </button>
          </li>
          <li>
            <button
              onClick={handleFolderUpload}
              className="flex items-center w-full text-left px-4 py-2 text-xs text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out"
            >
              <FolderUp size={14} className="mr-2" />
              Folder Upload
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UploadMenu;
