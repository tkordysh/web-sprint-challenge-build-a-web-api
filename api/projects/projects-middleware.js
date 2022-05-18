// add middlewares here related to projects
const Project = require("./projects-model");


exports.checkProjectPayload = (req, res, next) => {
  const error = { status: 400 };
  const { name, description } = req.body;
  if (typeof name !== "string" || typeof description !== "string") {
    error.message = "name and description are required";
  }
  if (error.message) {
    next(error);
  } else {
    next();
  }
};

exports.checkProjectUpdatePayload = (req, res, next) => {
    const error = { status: 400 };
    const { name, description, completed } = req.body;
    if (typeof name !== "string" || typeof description !== "string") {
      error.message = "name and description are required";
    } else if (completed === undefined) {
      error.message = "completion is required"
    }
    if (error.message) {
      next(error);
    } else {
      next();
    }
  };

exports.checkProjectId = async (req, res, next) => {
  try {
    const project = await Project.get(req.params.id);
    if (!project) {
      next({ status: 404, message: "project not found" });
    } else {
      req.project = project;
      next();
    }
  } catch (err) {
    next(err);
  }
};
