import FileUpload from "../components/fileUpload";

const DashboardIndex = () => {
  return (
    <>
      <div className="h-screen">
        <div className="bg-amber-200 mx-20 my-10">
          <FileUpload />
        </div>
        <div className="bg-amber-300">
          <h1>recent files</h1>
        </div>
      </div>
    </>
  );
};
export default DashboardIndex;
