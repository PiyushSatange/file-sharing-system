const express = require("express");
const {
  addFile,
  getFilesByUserId,
  shareFileByEmailId,
  getSharedFiles,
  archiveFile,
  getArchivedFilesByUserId,
  makeStarred,
  getStarred,
} = require("../controllers/fileController");
const multer = require("multer");
const { isTokenValid } = require("../middlewares/auth");

const fileRouter = express.Router();
const upload = multer({ dest: "uploads/" });

// fileRouter.use(isTokenValid);

fileRouter.route("/").post(isTokenValid, upload.single("file"), addFile);
fileRouter.route("/").get(isTokenValid, getFilesByUserId);
fileRouter.route("/share").post(shareFileByEmailId);
fileRouter.route("/shared").get(isTokenValid, getSharedFiles);
fileRouter.route("/").delete(isTokenValid, archiveFile);
fileRouter.route("/archived").get(isTokenValid, getArchivedFilesByUserId);
fileRouter.route("/star").put(isTokenValid, makeStarred);
fileRouter.route("/star").get(isTokenValid, getStarred);

module.exports = { fileRouter };
