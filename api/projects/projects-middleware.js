// add middlewares here related to projects
const Project = require("./projects-model");
const db = require("../../data/dbConfig");

// exports.checkProjectPayload = (req, res, next)

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
