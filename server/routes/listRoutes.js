
const express = require('express');
const listController = require('../controllers/listController')

const router = express.Router();

router
    .route("/")
    .get(listController.getAllShoppingLists)
    .post(listController.createShoppingList);

router
    .route("/:id")
    .get(listController.getList)
    .delete(listController.deleteShoppingList)



module.exports = router;