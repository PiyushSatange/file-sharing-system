import { useState } from "react";
import { Upload } from "lucide-react";

export default function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFileSend = async () => {
    const formdata = new FormData();
    formdata.append("file", file);
    const response = await fetch("http://localhost:8000/file", {
      body: formdata,
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-lime-900 p-6 rounded-lg shadow-xl w-full flex flex-col gap-6 text-white">
        <h3 className="text-xl font-semibold text-center text-lime-300">
          Upload Your File
        </h3>

        <label className="border-2 border-dashed border-lime-500 bg-lime-800 hover:bg-lime-700 cursor-pointer p-6 rounded-lg flex flex-col justify-center items-center text-center transition duration-300">
          <Upload className="w-10 h-10 text-lime-400 mb-2" />
          <span className="text-lime-300">Drag & Drop or Click to Upload</span>
          <input
            type="file"
            className="hidden"
            name="file"
            onChange={handleFileChange}
          />
        </label>

        {file && (
          <div className="flex flex-col items-center bg-lime-800 p-3 rounded-md">
            <p className="text-lime-300 text-sm">Selected File:</p>
            <span className="text-lime-400 font-medium">{file.name}</span>
          </div>
        )}

        <button
          className="w-full bg-lime-600 text-white font-medium py-2 rounded-md hover:bg-lime-700 hover:cursor-pointer transition duration-300 disabled:opacity-50"
          disabled={!file}
          onClick={handleFileSend}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
