import { useEffect, useState } from "react";
import FileUpload from "../components/fileUpload";
import FileCard from "../components/fileCard";

const DashboardIndex = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function getFiles() {
      const response = await fetch("http://localhost:8000/file", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setFiles(data.files);
    }
    getFiles();
  }, []);

  return (
    <>
      <div className="h-screen">
        <div className="bg-amber-200 mx-20 my-10">
          <FileUpload />
        </div>
        <div className="bg-amber-300 p-4 grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
          {files &&
            files.map((file, index) => (
              <div key={index} className="flex justify-center">
                <FileCard file={file} className="h-full w-full" />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default DashboardIndex;
