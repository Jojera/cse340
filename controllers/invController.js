const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* **
 * Build inventory by classification view
 * **/
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    })
}

/* **
 * Build inventory detail view
 * **/
invCont.buildDetailView = async function (req, res, next) {
    const inv_id = req.params.invid
    const info = await invModel.getInventoryDetails(inv_id)
    const details = await utilities.buildInventoryDetails(info)
    let nav = await utilities.getNav()
    const year = info[0].inv_year
    const make = info[0].inv_make
    const model = info[0].inv_model
    res.render("./inventory/detail", {
        title: year + ' ' + make + ' ' + model,
        nav,
        details,
    })
}

/* **
 * Trigger an intentional 500 error 
 * **/
invCont.intentionalError = async function (req, res, next) {
    try {
        throw new Error("This is an intentional error for testing purposes.")
    } catch (err) {
        next(err)
    }
};
  

module.exports = invCont