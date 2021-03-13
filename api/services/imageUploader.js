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

const deleteImages = (bucketId, imageIds) => {
	let imagesToDelete = [];

	imageIds.forEach(id => {
		imagesToDelete.push({ Key: id });
	});
	
  console.log("BUCKET ID", bucketId);
  console.log("image Ids", imagesToDelete);

	var params = {
		Bucket: bucketId, 
		Delete: {
			Objects: imagesToDelete, 
			Quiet: false
		}
	};

	s3.deleteObjects(params, (err, data) => {
    console.log("data:", data);
		if (err) {
      throw new Error(err);
    } else {
      console.log("Successfully deleted images.");
    }
	});
}

module.exports = {
  uploadTeaPhotos,
  uploadAvatar,
  deleteImages
};
