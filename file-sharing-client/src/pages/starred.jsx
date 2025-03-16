import { useEffect, useState } from "react";
import FileCard from "../components/fileCard";

const Starred = () => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    async function getFiles() {
      const response = await fetch("http://localhost:8000/file/star", {
        method: "GET",
        credentials: "include",
        // body: JSON.stringify({fileId:})
      });
      const data = await response.json();
      setFiles(data.data);
      console.log(data);
    }
    getFiles();
    console.log("files:", files);
  }, []);
  return (
    <>
      <div className="bg-amber-300 p-4 grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {files.length > 0 ? (
          files.map((file, index) => (
            <div key={index} className="flex justify-center">
              <FileCard file={file} className="h-full w-full" />
            </div>
          ))
        ) : (
          <p>no starred file found</p>
        )}
      </div>
    </>
  );
};

export default Starred;
