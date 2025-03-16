import { useEffect, useState } from "react";
import FileCard from "../components/fileCard";

const Bin = () => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    async function getFiles() {
      const response = await fetch("http://localhost:8000/file/archived", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      setFiles(data.files);
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

export default Bin;
