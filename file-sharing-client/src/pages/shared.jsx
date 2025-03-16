import { useEffect, useState } from "react";
import FileCard from "../components/fileCard";

const Shared = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function getFiles() {
      const response = await fetch("http://localhost:8000/file/shared", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) setFiles(data.data);
    }
    getFiles();
  }, []);

  return (
    <>
      <div className="bg-amber-300 p-4 grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {files &&
          files.map((file, index) => (
            <div key={index} className="flex justify-center">
              <FileCard file={file} className="h-full w-full" />
            </div>
          ))}
      </div>
    </>
  );
};

export default Shared;
