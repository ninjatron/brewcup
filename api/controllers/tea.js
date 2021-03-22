const { validationResult } = require('express-validator');
const uploadImage = require('../services/imageUploader');

//const uploadManyImages = uploadImage.array("photos");

const Tea = require('../models/tea');
const User = require('../models/user');

// collection operations
const getAllTeas = (req, res, next) => {
  const pageNo = parseInt(req.params.pageNumber) - 1;
  const itemCount = 12;
  let size;
  Tea.find()
    .estimatedDocumentCount()
    .then(count => {
        size = count;
    })
    .catch(err => {
      // add error code later
      next(err);
    })

  Tea.find()
     .sort({ score: 1 })
     .skip(pageNo * itemCount)
     .limit(itemCount)
     .then(teas => {
      res.status(200).json({
        message: "Teas retrieved",
        teas: teas,
        count: size
      })
     })
     .catch(err => {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
     });
};

const getPaginatedTeas = (req, res, next) => {
  const pageNo = parseInt(req.params.pageNumber) - 1;
  const itemCount = 20;
  Tea.find()
     .sort({ score: 1 })
     .skip(pageNo * itemCount)
     .limit(itemCount)
     .then(teas => {
      res.status(200).json({
        message: "Teas retrieved",
        teas: teas
      })
     })
     .catch(err => {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
     });
};

const getPaginatedResults = (req, res, next) => {
  const pageNo = parseInt(req.params.pageNumber) - 1;
  const itemCount = 20;
  Tea.find()
     .sort({ score: 1 })
     .skip(pageNo * itemCount)
     .limit(itemCount)
     .then(teas => {
      res.status(200).json({
        message: "Teas retrieved",
        teas: teas
      })
     })
     .catch(err => {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
     });
};

const getRandomTeas = (req, res, next) => {
  const limit = parseInt(req.params.limit);
  Tea.aggregate()
    .sample(limit)
    .then(teas => {
      res.status(200).json({
        message: "Teas retrieved",
        teas: teas
      });
    })
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
}

// single identity operations
// gets a single tea using teaId from request params
const getTea = (req, res, next) => {
  const teaId = req.params.teaId;
  Tea.findById(teaId).then(tea => {
    if (!tea) {
      const error = new Error('Tea does not exist.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ tea: tea });
  }).catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
}; 

// creates a new tea and saves it to the db
const addTea = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    throw error;
  }

  // TODO: Add images
  let owner;
  let imageAddresses = req.files.map(img => img.location);

  const tea = new Tea({
    name: req.body.name,
    description: req.body.description,
    teaType: req.body.teaType,
    packaging: req.body.packaging,
    region: req.body.region,
    estate: req.body.estate,
    isAvailable: req.body.isAvailable,
    flavor: req.body.flavor,
    leaf: req.body.leaf,
    brewColor: req.body.brewcolor,
    addedBy: req.userId,
    photos: imageAddresses
  });

  tea.save()
    .then(result => {
      return User.findById(req.userId);
    })
    .then(user => {
      owner = user;
      user.addedProducts.push(tea);
      return user.save();
    })
    .then(result => {
      res.status(201).json({
        message: "Added new tea",
        tea: tea,
        addedBy: {_id: owner._id, name: owner.username }
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });

};

// updates a tea detail, need to add user auth
const updateTea = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Tea update validation failed.");
    error.statusCode = 422;
    throw error;
  }

  const teaId = req.params.teaId;
  Tea.findById(teaId).then(tea => {
    if (!tea) {
      const error = Error('Tea does not exist.');
      error.statusCode = 404;
      throw error;
    }
    if (tea.addedBy.toString() !== req.userId) {
      const error = new Error('Only creator of an item can change its details.');
      error.statusCode = 403;
      throw error;
    }
    tea.name = req.body.name;
    tea.description = req.body.description; 
    tea.teaType = req.body.teaType;
    tea.packaging = req.body.packaging;
    tea.region = req.body.region;
    tea.estate = req.body.estate;
    tea.isAvailable = req.body.isAvailable;
    tea.flavor = req.body.flavor;
    tea.leaf = req.body.leaf;
    tea.brewColor = req.body.brewcolor;
    return tea.save();
  }).then(result => {
    res.status(200).json({message: "Updated tea.", result: result });
  }).catch(err => {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  });
};

// const updateTeaPhotos = (req, res, next) => {
//   console.log("Photo req: ", req.files);
//   if (req.body.photos === 'undefined') {
//     const error = Error('No image uploaded.');
//     error.statusCode = 404;
//     throw error;
//   }

//   const teaId = req.params.teaId;
//   const imageLocations = [];

//   uploadManyImages(req, res, function (err) {
//     if (err) {
//       return res.json({
//         success: false,
//         errors: {
//           title: "Image Upload Error",
//           detail: err.message,
//           error: err,
//         },
//       });
//     }

//     for (let i = 0; i < req.files.length; ++i)
//       imageLocations.push(req.files[i].location);
//   });

//   const update = { photos: imageLocations };
//   Tea.findOneAndUpdate(teaId, update)
//     .then(tea => {
//       res.status(200).json({ 
//         message: "Images uploaded", 
//         tea: tea 
//       })
//     })
//     .catch(err => {
//       res.status(400).json({ 
//         message: "Tea could not be updated", 
//         error: err 
//       })
//     });

// };

// deletes a tea
const deleteTea = (req, res, next) => {
  const teaId = req.params.teaId;
  Tea.findById(teaId).then(tea => {
    if (tea.addedBy.toString() !== req.userId) {
      const error = new Error('Only creator of an item can change its description.');
      error.statusCode = 403;
      throw error;
    }
    tea.remove();
    return User.findById(req.userId);
  })
  .then(user => {
    user.addedProducts.pull(teaId);
    return user.save();
  })
  .then(result => {
    res.status(200).json({ message: "Item has been deleted." });
  })
  .catch(err => {
    if (!err.statusCode) err.statusCode = 500;
    next(err); 
  });
};

const toggleFavorite = (req, res, next) => {
  const teaId = req.params.teaId;
  const userId = req.body.userId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Tea favorite validation failed.");
    error.statusCode = 422;
    throw error;
  }

  console.log("Favorite:", userId);

  Tea.findById(teaId)
    .then(tea => {
      console.log("Tea", tea);
      if (tea.favoritedBy.indexOf(userId) >= 0) {
        // user already favorited tea, so this is unfavorite
        tea.favoritedBy.pull({ _id: userId });
        tea.favoriteCount -= 1;
      } else {
        // user favorited tea
        tea.favoritedBy.push({ _id: userId });
        tea.favoriteCount -= 1;        
      }
      return tea.save();
    })
    .then(updatedTea => {
      res.status(200).json({
        tea: updatedTea
      })
    })
    .catch(err => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    }); 
};

const getAutocompleteResults = async (req, res, next) => {
  let searchText = req.params.query;
  try {
    let result = await Tea.aggregate()
                        .search({
                          "index": "teaIndex",
                          "autocomplete": {
                              "query": `${searchText}`,
                              "path": "name",
                              "fuzzy": {
                                  "maxEdits": 2,
                                  "prefixLength": 3
                              }
                          }
                        })
                        .sample(7);
    res.status(200).json({ result });
  } catch (e) {
      console.log(e);
      res.status(500).send({ message: e.message });
  }
}

module.exports = {
  getTea,
  addTea,
  updateTea,
  //updateTeaPhotos,
  deleteTea,
  getAllTeas,
  getRandomTeas,
  getPaginatedTeas,
  getAutocompleteResults,
  getPaginatedResults,
  toggleFavorite
};