const invModel = require("../models/inventory-model")
const Util = {}

/* **
 * Constructs the nav HTML unordered list
 * **/
Util.getNav = async function (req, res, next) {
    let data = await invModel.getClassifications()
    console.log(data)
    let list = "<ul id='dynamic-nav'>"
    list += '<li><a href="/" title="Home page">Home</a></li>' 
    data.rows.forEach((row) => {
        list += "<li>"
        list +=
            '<a href="/inv/type/' +
            row.classification_id +
            '" title="See our inventory of ' +
            row.classification_name +
            ' vehicles">' +
            row.classification_name +
            '</a>'
        list += "</li>"
    })
    list += "</ul>"
    return list
}

/* **
* Build the classification view HTML
* ** */
Util.buildClassificationGrid = async function(data){
    let grid
    if(data.length > 0){
      grid = '<ul id="inv-display">'
      data.forEach(vehicle => { 
        grid += '<li>'
        grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
        + ' details"><img src="' + vehicle.inv_thumbnail 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors"></a>'
        grid += '<div class="namePrice">'
        grid += '<hr>'
        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'
        grid += '<span>$' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '</li>'
      })
      grid += '</ul>'
    } else { 
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
  }

  Util.buildInventoryDetails = async function(info) {
    let details
    if(info.length > 0) {
      details = '<div id="inv-details">'
      info.forEach(vehicle => {
        details += '<div>'
        details += '<img src="' + vehicle.inv_image + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model + '">'
        details += '</div>'
        details += '<div class="inv-details-text">'
        details += '<h3><strong>' + vehicle.inv_make + ' ' + vehicle.inv_model + ' details</strong></h3>'
        details += '<p><strong>Price:</strong> $' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</p>'
        details += '<p><strong>Description:</strong> ' + vehicle.inv_description + '</p>'
        details += '<p><strong>Color:</strong> ' + vehicle.inv_color + '</p>'
        details += '<p><strong>Mileage:</strong> ' + new Intl.NumberFormat('en-US').format(vehicle.inv_miles) + ' miles</p>'
        details += '</div>'
      })
      details += '</div>'
    } else {
      details += '<p class="notice">Sorry, no details found for this vehicle.</p>'
    }
    return details
  }


/* **
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 * **/
Util.handleErrors  = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
  
module.exports = Util




