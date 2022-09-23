import express from "express";
import "./db/mongoose.js";
import { User } from "./models/user.js";
import { Task } from "./models/task.js";
import { router } from "./router/user.js";
import bcr from "bcryptjs";
import { router as routerT } from "./router/task.js";
import multer from "multer";
import { auth } from "./middleware/auth.js";

const app = express();
const port = process.env.PORT;
const upload = multer({
  dest: "images",
  fileFilter(req, file, cb) {
    if (file.originalname.endsWith(".pdf")) {
      return cb(new Error("Please upload a PDF"));
    }
    cb(undefined, true);
  },
});
app.post("/upload", upload.single("upload"), (req, res) => {
  res.send();
});

app.use(express.json());
app.use(router);
app.use(routerT);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

const main = async () => {
  const task = await Task.findById("631f3f5efa36d61124343d96");
  await task.populate("owner");
  // console.log(task.owner);
};

main();
