// collection operations
const getAllUsers = (req, res, next) => {
  res.status(200).json({
    users: []
  });
};


// single identity operations
const getUser = (req, res, next) => {
  // req.data = "dummy";
  res.status(200).json({
    user: {

    }
  });
};

const postUser = (req, res, next) => {
  res.status(201).json({
    user: {

    }
  })
};

const patchUser = (req, res, next) => {
  res.status(204).json({
    user: {

    }
  })
};

const deleteUser = (req, res, next) => {
  res.status(204).json({
    user: {

    }
  })
};

module.exports = {
  getUser,
  postUser,
  patchUser,
  deleteUser,
  getAllUsers
};
