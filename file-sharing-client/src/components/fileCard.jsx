import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import Swal from "sweetalert2";

const FileCard = ({ file }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleStar() {
    async function starFile() {
      console.log(file);
      const payload = {
        fileId: file._id,
      };
      const response = fetch("http://localhost:8000/file/star", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log(data);
    }
    starFile();
  }

  function handleArchive() {
    async function deleteFile() {
      console.log(file);
      const payload = {
        fileId: file._id,
      };
      const response = fetch("http://localhost:8000/file", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json", // <-- FIX: Set content type
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log(data);
    }
    if (file.sharedWith.length > 0) {
      Swal.fire({
        title: "Are you sure?",
        text: "This file is being shared with others, they will also loose the access",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteFile();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    } else if (file.isActive === false) {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to permanently delete this file?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteFile();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this file?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteFile();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    }
    console.log("file selected", file.sharedWith.length);
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-80 flex items-center border border-gray-300 cursor-pointer relative">
      {/* File Icon */}
      <div className="w-16 h-16 bg-lime-500 text-white rounded-lg flex justify-center items-center text-3xl">
        <FileIcon fileType={file.fileType} />
      </div>

      {/* Divider */}
      <div className="w-px h-12 bg-gray-300 mx-4"></div>

      {/* File Details */}
      <div className="flex flex-col flex-grow">
        <p className="text-lg font-semibold text-gray-800">{file.name}</p>
        <p className="text-sm text-gray-600">{file.fileType}</p>
        <p className="text-sm font-medium text-lime-600">
          {formatFileSize(file.fileSize)}
        </p>
      </div>

      {/* Three Dots Menu */}
      <div className="relative" ref={menuRef}>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <MoreVertical className="text-gray-600 hover:text-gray-800" />
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 top-8 bg-white shadow-md rounded-md w-32 border border-gray-200 z-10">
            <ul className="py-1">
              {file.isActive && (
                <>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Download
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Share
                  </li>
                  {!file.isStarred && (
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={handleStar}
                    >
                      Star
                    </li>
                  )}

                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleArchive}
                  >
                    Archive
                  </li>
                </>
              )}
              {file.isActive === false && (
                <>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleArchive}
                  >
                    Delete
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleArchive}
                  >
                    Restore
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// Function to format file size (in KB, MB, GB)
const formatFileSize = (size) => {
  if (size < 1024) return `${size} B`;
  else if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  else if (size < 1024 * 1024 * 1024)
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
};

// File Icon component (basic example)
const FileIcon = ({ fileType }) => {
  if (fileType.includes("image")) return <span>🖼️</span>;
  if (fileType.includes("pdf")) return <span>📄</span>;
  if (fileType.includes("video")) return <span>🎥</span>;
  if (fileType.includes("zip")) return <span>📦</span>;
  return <span>📁</span>;
};

export default FileCard;
