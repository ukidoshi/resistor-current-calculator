const express = require("express");
const router = express.Router();
const resistorsController = require("../controllers/resistorsController");

router.get("/", resistorsController.getAllResistors);
router.get("/:id", resistorsController.getResistorById);
router.post("/", resistorsController.createResistor);
router.patch("/:id", resistorsController.updateResistor);
router.delete("/:id", resistorsController.deleteResistor);

module.exports = router;
