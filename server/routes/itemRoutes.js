const express = require('express');
const itemController = require('../controllers/itemController')

const router = express.Router();

router
    .route("/")
    // .get(itemController.getItems)
    .post(itemController.addItem)

router
    .route("/:id")
    .delete(itemController.deleteItem)

module.exports = router;