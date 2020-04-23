var mysql = require("mysql")
var table = require("console.table")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "local host",
    port: 7000,
    user: "root",
    password: "Biceps1309",
    database: "bamazonDB"
})

function productItems() {
    connection.connect(function (err) {
        connection.query("SELECT * from products", function (err, res) {
            if (err) throw err
            else console.table(res, "\n")
            productID()
        })
    })

}

function productID() {

    inquirer.prompt([{
        type: "input",
        name: "id",
        message: "Please enter the ID for the product you're looking for\n",
        validate: function (value) {
            if (!isNaN(value)) {
                return true
            }
            return false
        }
    }])
    .then(function (answer) {
        var userId = answer.id
        console.log("Selected Product ID: ", userId)
        var userQuant = answer.quant
        console.log("Selected Product ", userQuant, "\n")
        
    connection.query("SELECT * from products ", [{
            item_id: answer.id
        }], function (err, res) {
            if (err) throw err
            console.table(res)
            var currentStock = res[0].stockQuantity
            console.log("Current Profuct in Stock: ", currentStock)
            var price = res[0].price
            var remainingStock = currentQuantity - answer.quant
            console.log("Remaining Stock: ", remainingStock)