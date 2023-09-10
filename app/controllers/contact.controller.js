exports.create = (req, res) => {
  res.send("create handler",
  );
};

exports.findAll = (req, res) => {
  res.send("findAll handler",
  );
};

exports.findOne = (req, res) => {
  res.send("findOne handler",
  );
};

exports.update = (req, res) => {
  res.send( "update handler",
  );
};

exports.delete = (req, res) => {
  res.send("delete handler",
  );
};

exports.deleteAll = (req, res) => {
  res.send({
    message: "deleteAll handler",
  });
};

exports.findAllFavorite = (req, res) => {
  res.send("findAllFavorite handler");
};
