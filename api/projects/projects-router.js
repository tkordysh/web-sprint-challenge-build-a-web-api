// Write your "projects" router here!
const router = require("express").Router();
const md = require("./projects-middleware");
const Project = require("./projects-model");

//GET ALL
router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.get();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

//GET BY ID
router.get("/:id", md.checkProjectId, async (req, res, next) => {
  try {
    const project = await Project.get(req.params.id);
    res.json(project)
  } catch (err) {
    next(err);
  }
});

//POST
router.post("/", md.checkProjectPayload, async (req, res, next) => {
  try {
    const newProject = await Project.insert(req.body);
    res.json(newProject)
  } catch (err) {
    next(err);
  }
});

// //PUT
// router.put("/:id", async (req, res, next) => {
//   try {
//     console.log("update project");
//   } catch (err) {
//     next(err);
//   }
// });

// //DELETE
// router.delete("/:id", async (req, res, next) => {
//   try {
//     console.log("delete project");
//   } catch (err) {
//     next(err);
//   }
// });

// //GET BY ID AND ACTION
// router.get("/", async (req, res, next) => {
//   try {
//     console.log("get by id and action");
//   } catch (err) {
//     next(err);
//   }
// });

// //Error handling
// router.use((err, req, res, next) => {
//   res.status(err.status || 500).json({
//     message: err.message,
//   });
// });

module.exports = router;
