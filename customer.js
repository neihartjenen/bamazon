var mysql = require("mysql")
var table = require("console.table")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "local host",
    port: 7000,
    user: "root",
    password: "",
    database: ""
})

function productItems() {
    connection.connect(function (err) {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err
            else console.table(res, "\n")
            productID()
        })
    })

}
productItems()


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
    }]).then(function (answer) {
        var userId = answer.id
        console.log("Selected Item ID: ", userId)
        var userQuant = answer.quant
        console.log("Selected Item Quantity from Inventory: ", userQuant, "\n")