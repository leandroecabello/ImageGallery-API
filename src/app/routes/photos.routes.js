const { Router } = require("express");
const PhotoController = require("../controllers/photo.controller");
const multer = require("../libs/multer");
const router = Router();

router
  .get("/", PhotoController.getAll)

  .post("/createPhoto", multer.single("image"), PhotoController.add)

  .get("/:id", PhotoController.getById)

  .put("/editPhoto/:id", PhotoController.update)

  .delete("/deletePhoto/:id", PhotoController.deleteById);

module.exports = router;
