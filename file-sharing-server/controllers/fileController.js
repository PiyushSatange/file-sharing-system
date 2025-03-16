const { File } = require("../models/files");
const { User } = require("../models/user");

const addFile = async (req, res) => {
  try {
    console.log(req.user);
    console.log("Inside add file route");

    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, msg: "No file uploaded" });
    }

    const newFile = await File.create({
      name: file.originalname,
      fileType: file.mimetype,
      fileSize: file.size,
      uploadDate: Date.now(),
      owner: req.user.id,
    });

    return res.status(201).json({ success: true, data: newFile });
  } catch (error) {
    console.error("Error in addFile:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal server error", error });
  }
};

const getFilesByUserId = async (req, res) => {
  const files = await File.find({ owner: req.user.id, isActive: true });
  if (files) {
    return res.status(200).json({ success: true, files });
  } else {
    return res
      .status(400)
      .json({ success: true, msg: "user haven't uploaded any file" });
  }
};
const getArchivedFilesByUserId = async (req, res) => {
  const files = await File.find({ owner: req.user.id, isActive: false });
  if (files) {
    return res.status(200).json({ success: true, files });
  } else {
    return res
      .status(400)
      .json({ success: true, msg: "user haven't uploaded any file" });
  }
};

const shareFileByEmailId = async (req, res) => {
  try {
    const { sharedWithEmail, fileId, accessLevel } = req.body;

    if (!sharedWithEmail || !fileId || !accessLevel) {
      return res
        .status(400)
        .json({ success: false, msg: "Missing required fields" });
    }

    // Check if the user with the given email exists
    const user = await User.findOne({ email: sharedWithEmail });

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    // Update file to add the shared user
    const updatedFile = await File.findByIdAndUpdate(
      fileId,
      { $push: { sharedWith: { user: user._id, accessLavel: accessLevel } } },
      { new: true } // Return updated document
    );

    if (!updatedFile) {
      return res.status(404).json({ success: false, msg: "File not found" });
    }

    return res.status(200).json({
      success: true,
      msg: "File shared successfully",
      data: updatedFile,
    });
  } catch (error) {
    console.error("Error sharing file:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal server error", error });
  }
};

const getSharedFiles = async (req, res) => {
  try {
    const userId = req.user.id; // Get current user's ID

    const sharedFiles = await File.find({ "sharedWith.user": userId })
      .populate("owner", "email") // Populate owner details (optional)
      .lean(); // Convert Mongoose documents to plain objects for manipulation

    if (!sharedFiles.length) {
      return res
        .status(404)
        .json({ success: false, msg: "No shared files found" });
    }

    // Filter sharedWith array to include only the current user's details
    const filteredFiles = sharedFiles.map((file) => ({
      ...file,
      sharedWith: file.sharedWith.filter(
        (entry) => entry.user.toString() === userId
      ),
    }));

    return res.status(200).json({ success: true, data: filteredFiles });
  } catch (error) {
    console.error("Error fetching shared files:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal server error", error });
  }
};

const archiveFile = async (req, res) => {
  const { fileId } = req.body;
  try {
    console.log(req.body.fileId);
    const file = await File.findOne({ _id: fileId });
    console.log(file);
    if (file.isActive === true) {
      // Update file to add the shared user
      const updatedFile = await File.findByIdAndUpdate(
        fileId,
        { $set: { isActive: false } },
        { new: true } // Return updated document
      );
      if (!updatedFile) {
        return res.status(404).json({ success: false, msg: "File not found" });
      }
      return res.status(200).json({
        success: true,
        msg: "File archived successfully",
        data: updatedFile,
      });
    } else {
      const deletedFile = await File.deleteOne({ _id: fileId });
      if (!deletedFile) {
        return res.status(404).json({ success: false, msg: "File not found" });
      }
      return res.status(200).json({
        success: true,
        msg: "File permanently deleted successfully",
        data: deletedFile,
      });
    }
  } catch (error) {
    console.error("Error sharing file:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal server error", error });
  }
};

const makeStarred = async (req, res) => {
  try {
    const { fileId } = req.body;

    // Validate input
    if (!fileId) {
      return res
        .status(400)
        .json({ success: false, msg: "File ID is required" });
    }

    // Check if the file exists
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ success: false, msg: "File not found" });
    }

    // Check if already starred
    if (file.isStarred) {
      return res
        .status(200)
        .json({ success: true, msg: "File is already starred", data: file });
    }

    // Update the file
    const updatedFile = await File.findByIdAndUpdate(
      fileId,
      { $set: { isStarred: true } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: updatedFile,
      msg: "File marked as starred",
    });
  } catch (error) {
    console.error("Error marking file as starred:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal server error" });
  }
};

const getStarred = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log("get starred user id:", userId);

    // Retrieve starred files
    const files = await File.find({ owner: userId, isStarred: true });

    if (files.length === 0) {
      return res
        .status(200)
        .json({ success: true, msg: "No starred files found", data: [] });
    }

    console.log("starred files:", files);

    return res.status(200).json({ success: true, data: files });
  } catch (error) {
    console.error("Error fetching starred files:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal server error" });
  }
};

module.exports = {
  addFile,
  getFilesByUserId,
  shareFileByEmailId,
  getSharedFiles,
  archiveFile,
  getArchivedFilesByUserId,
  makeStarred,
  getStarred,
};
