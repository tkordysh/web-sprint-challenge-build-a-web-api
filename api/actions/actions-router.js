// Write your "actions" router here!
const router = require('express').Router();
const md = require('./actions-middleware');
const Action = require('./actions-model');


//GET ALL
router.get("/", async (req, res, next) => {
    try {
      const actions = await Action.get();
      res.json(actions);
    } catch (err) {
      next(err);
    }
  });
  
  //GET BY ID
  router.get("/:id", md.checkActionId, async (req, res, next) => {
    try {
      const action = await Action.get(req.params.id);
      res.json(action)
    } catch (err) {
      next(err);
    }
  });
  
  //POST
  router.post("/", md.checkActionPayload, async (req, res, next) => {
    try {
      const newAction = await Action.insert(req.body);
      res.json(newAction)
    } catch (err) {
      next(err);
    }
  });
  
  //PUT
  router.put("/:id", md.checkActionId, md.checkActionUpdatePayload, async (req, res, next) => {
    try {
      const updated = await Action.update(req.params.id, req.body);
      res.json(updated)
    } catch (err) {
      next(err);
    }
  });
  
  //DELETE
  router.delete("/:id", md.checkActionId, async (req, res, next) => {
    try {
      await Action.remove(req.params.id)
      res.json(req.project)
    } catch (err) {
      next(err);
    }
  });

  //Error handling
router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message,
    });
  });  



module.exports = router;
