// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")

// Route to handle intentional 500 error
router.get("/error", invController.intentionalError);

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory detail view
router.get("/detail/:invid", invController.buildDetailView);

module.exports = router