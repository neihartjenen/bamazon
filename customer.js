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
    connection.query("SELECT * FROM Products", function(err, res) {
        if (err) throw err;
        console.table(res);
       askCustomer();
    });
}

function askCustomer() {
    // Selects alll data from MySQL table
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.table(res);
  
      askCustomer(res);
    });
  }

  // Prompts customer for product ID
function askCustomer(inventory) {
    inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "What is the item you would like to purchase? [Quit with Q]",
        validate: function(val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      checkIfShouldExit(val.choice);
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);

      if (product) {
        askCustomerForQuantity(product);
      }
      else {
        // Otherwise let them know the item is not in the inventory, re-run loadProducts
        console.log("\nThat item is not in the inventory.");
        loadProducts();
      }
    });
}  
