const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const packageRoutes = require("./routes/packageRoutes");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const multer = require("multer");
const path = require("path");
const Grid = require("gridfs-stream");
const crypto = require("crypto");
const GridFsStorage = require("multer-gridfs-storage");
const session = require("express-session");
require("dotenv/config");

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.static("./uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_KEY,
    name: "User",
    proxy: true,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.static("./uploads"));
app.use(methodOverride("_method"));
app.use(cookieParser());

// Start Of Image Storing Engine

const conn = mongoose.createConnection(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Initialize gfs
let gfs;

conn.once("open", () => {
  // Init Stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Create storage engine
var storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

var filenames, files_ids, filename, file_id;

app.post(
  "/upload",
  upload.fields([
    { name: "package_image", maxCount: 1 },
    { name: "showcase", maxCount: 8 },
  ]),
  (req, res) => {
    filenames = [];
    files_ids = [];
    req.files.showcase.forEach((file) => {
      filenames.push(file.filename);
      files_ids.push(file.id);
    });
    filename = req.files.package_image[0].filename;
    file_id = req.files.package_image[0].id;

    res.redirect("/dashboard");
  }
);

app.get("/filename", (req, res) => {
  res.send(filename);
});

app.get("/file_id", (req, res) => {
  res.send(file_id);
});

app.get("/files/filenames", async (req, res) => {
  res.send(filenames);
});

app.get("/files/files_ids", (req, res) => {
  res.send(files_ids);
});

// Get Files from DB
app.get("/files", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check If Files Exist
    if (!files || files.length == 0) {
      return res.status(404).json({
        err: "No files exist",
      });
    }

    // Files Exist
    return res.json(files);
  });
});

// Display File Content (text)
app.get("/files/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }

    return res.json(file);
  });
});

app.delete("/files/:id", (req, res) => {
  try {
    gfs.remove({
      _id: req.params.id,
      root: "uploads",
    });
    res.send("File deleted successfully!");
  } catch (err) {
    res.json({ Error: err.message });
  }
});

// Display Image
app.get("/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }

    // Check if the file is an image
    if (
      file.contentType === "image/jpeg" ||
      file.contentType === "image/png" ||
      file.contentType === "image/jpeg"
    ) {
      // Read Output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({ err: "Not an Image!" });
    }
  });
});

// End Of Image Storing Engine

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT + "...");
});

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log("Connected to DB!")
);

app.use("/auth", authRoutes);
app.use("/packages", packageRoutes);
app.use("/wishlist", wishlistRoutes);
