const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiErrror = require("../api-error");
// Create and Save a new Contact

exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiErrror(404, "Name can't not be empty"));
  }
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiErrror(500, "An error occurred while creating the contact")
    );
  }
};

exports.findAll = async (req, res, next) => {
  let document = [];
  try {
    const contactService = new ContactService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      document = await contactService.findByName(name);
    } else {
      document = await contactService.find({});
    }
  } catch (error) {
    return next(
      new ApiErrror(500, "An error occurred while retrieving contacts")
    );
  }
  return res.send(document);
};

exports.findOne = async (req, res, next) => {
  const contactService = new ContactService(MongoDB.client);
  const document = await contactService.findById(req.params.id);
  try {
    if (!document) {
      return next(new ApiErrror(404, "Contact not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiErrror(500, `ERROR RETRIEVING COTACT WITH ID =${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiErrror(404, "Data to update can not be empty"));
  }
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiErrror(404, "Contact not found"));
    }
    return res.send({ message: "Contact was update successfully" });
  } catch (error) {
    return next(
      new ApiErrror(500, `Error updating contact with id=${req.params.id}`)
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.delete(req.params.id);
    if (!document) {
      return res.send("Contact was deleted successlully");
    } else {
      return next(new ApiErrror(404, "Contact Not Found"));
    }
  } catch (error) {
    return next(
      new ApiErrror(500, `Could not delete contact with id=${req.params.id}`)
    );
  }
};

exports.deleteAll = (req, res) => {
  res.send({
    message: "deleteAll handler",
  });
};

exports.findAllFavorite = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.findAllFavorite();
    return res.send(document);
  } catch (error) {
    return next(
      new ApiErrror(500, "An error occurred while retrieving favorite contacts")
    );
  }
};


exports.deleteAll = async(req, res, next) =>{
  try {
    const contactService = new ContactService(MongoDB.client);
    const deleteCount = await contactService.deleteAll();
    return res.send({
      message : `${deleteCount} contact was deleted successfully`,
    })
  } catch (error) {
    return ApiErrror(500, "An error occurred while removing all contacts");
  }
}
