var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazonDB"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
    showProducts();
});


function showProducts() {
    console.log("Items available for purchase: \n");
    connection.query("SELECT * FROM Products", function(err, res) {
        if (err) throw err;
        console.table(res);
       askCustomer();
    });
}

function askCustomer() {
    inquirer.prompt([
        {type: "number",
        message: "What items do you want to purchase?",
        name: "item"
        },
        {type: "number",
        message: "How many?",
        name: "quantity"
        }        
    ]) .then(function(response){
        // checks DB for your item and verifies stock quantity
        checkInventory(response);
    })    
}

function checkInventory(response) {
    connection.query("SELECT * FROM Products WHERE item_id = " + response.item, function(err, res) {
       
        if(res[0].stock_quantity < response.quantity) {
            console.log("Not Enough Inventory!");
            showProducts()
        }
        else{
            console.log("Order confirmed! Total Price: ", res[0].price * response.quantity);
            var newQuantity = res[0].stock_quantity - response.quantity

            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    { stock_quantity: newQuantity
                },
                {item_id: response.item}
            ],
            function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " products updated!\n");
                // Call deleteProduct after the update completes
                showProducts();
            }
            );
        }
    })
}