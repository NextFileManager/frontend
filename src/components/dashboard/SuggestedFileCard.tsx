import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContextMenu from "./ContextMenu";
import { File, Folder } from "lucide-react";

interface SuggestedFileCardProps {
  file: {
    fileName: string;
    created: string;
    modified: string;
    imagepath: string;
    mime_type: string;
  };
  refreshData: () => void;
}

const SuggestedFileCard: React.FC<SuggestedFileCardProps> = ({
  file,
  refreshData,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const formatDate = (epoch: string) => {
    const date = new Date(parseInt(epoch) * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatName = (fileName: string) => {
    if (!fileName) return "Unnamed File";
    const formattedName = fileName.replace(/\.[^/.]+$/, "");
    return formattedName.length > 20
      ? formattedName.slice(0, 20) + "..."
      : formattedName;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md p-4 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200">
      <Link to="/" className="flex items-center space-x-4">
        {file.mime_type === "inode/directory" ? (
          <Folder className="h-8 w-8 fill-current dark:text-darkIconPrimary" />
        ) : (
          <File className="h-8 w-8 fill-current dark:text-darkIconPrimary" />
        )}
        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold text-sm sm:text-sm md:text-md dark:text-white truncate"
            title={file.fileName}
          >
            {formatName(file.fileName)}
          </h3>
          <p className="text-xs sm:text-xxs dark:text-gray-400 mt-1">
            {formatDate(file.modified)}
          </p>
        </div>
      </Link>
      <div className="absolute top-[20px] right-4">
        <ContextMenu
          fileName={file.fileName}
          open="Open"
          rename="Rename"
          onDelete="Delete"
          mime_type={file.mime_type}
          isOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          refreshData={refreshData}
        />
      </div>
    </div>
  );
};

export default SuggestedFileCard;
