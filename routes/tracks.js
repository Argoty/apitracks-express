const express = require("express");
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/tracks");
const router = express.Router();

const {
  validatorCreateItem,
  validatorGetItem,
} = require("../validators/tracks");

const customHeader = require("../middleware/customHeader");
const authMiddleware = require("../middleware/session");
const checkRol = require("../middleware/rol");

// ----------------- CRUD --------------
router.get("/", authMiddleware, customHeader, getItems);
router.get(
  "/:id",
  authMiddleware,

  validatorGetItem,
  getItem
);
router.post(
  "/",
  authMiddleware,
  checkRol(["admin"]),
  validatorCreateItem,
  createItem
);
router.put(
  "/:id",
  authMiddleware,
  validatorGetItem,
  validatorCreateItem,
  updateItem
);
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);

module.exports = router;
