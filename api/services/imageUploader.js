const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
  secretAccessKey: process.env.S3_ACCESS_SECRET,
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  region: "us-east-2",
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

const uploadTeaPhotos = multer({
  fileFilter,
  storage: multerS3({
    //acl: 'public-read',
    s3,
    bucket: "brewandcup-media/productImages",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING_METADATA" });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

const uploadAvatar = multer({
  fileFilter,
  storage: multerS3({
    //acl: 'public-read',
    s3,
    bucket: "brewandcup-media/avatars",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING_METADATA" });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = {
  uploadTeaPhotos,
  uploadAvatar
};

// {
//   "Version": "2012-10-17",
//   "Id": "BrewAndCupS3",
//   "Statement": [
//       {
//           "Sid": "Stmt1614579508185",
//           "Effect": "Allow",
//           "Principal": {
//               "AWS": "arn:aws:iam::907921864465:user/brewandcupUser"
//           },
//           "Action": "s3:*",
//           "Resource": "arn:aws:s3:::brewandcup/*"
//       }
//   ]
// }