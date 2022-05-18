// add middlewares here related to actions
const Action = require("./actions-model");



exports.checkActionPayload = (req, res, next) => {
    const error = { status: 400 };
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
      error.message = "id, notes, and description are required";
    }
    if (error.message) {
      next(error);
    } else {
      next();
    }
  };
  
  exports.checkActionUpdatePayload = (req, res, next) => {
      const error = { status: 400 };
      const { project_id, notes, description, completed } = req.body;
      if (!project_id || !description || !notes || !completed) {
        error.message = "id, notes, and description, and completion are required";
      }
      if (error.message) {
        next(error);
      } else {
        next();
      }
    };
  
  exports.checkActionId = async (req, res, next) => {
    try {
      const project = await Action.get(req.params.id);
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