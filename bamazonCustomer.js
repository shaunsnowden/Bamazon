// Pull in required dependencies
const colors = require("colors");
const inquirer = require("inquirer");
const express = require("express");
const bodyParser = require("body-parser");

// Define MySQL connection parameters
const mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password : 'Interlopers2!',
  database : 'bamazon'
});

// Test Connection
connection.connect(function(err){
  if (err) throw err;
  // console.log("Connected as id: " + connection.threadId);
  mainMenu();
});

// Input validation function to ensure only positive integers
function inputValid(value){
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);

  if (integer && (sign ===1)){
    return true;
  } else {
    return "Only positive whole numbers can be ordered.";
  }
}

// At startup, display current inventory available per SQL database.

function displayInventory(){

  // Create sql db query string
  var queryStr = "SELECT * FROM products";

  connection.query(queryStr, function(err,data){
    if (err) throw err;

    console.log("ITEMS FOR SALE:");

    var invSQL = "";

    for (var i = 0; i < data.length; i++){
      invSQL = "";
      invSQL += "Item ID: " + data[i].itemID + " || ";
      invSQL += "Product Name: " + data[i].product_name + " || ";
      invSQL += "Department: " + data[i].department_name + " || ";
      invSQL += "Price: $" + data[i].sales_price;

      console.log(invSQL.cyan);
    }

    runCustInput();
  })
};

function mainMenu(){
  inquirer.prompt([{
    type: 'list',
    name: 'loginChoice',
    message: 'MAIN MENU: Employee or Customer?',
    choices: ['Employee','Customer']
  }]).then(function(answer){
    switch (answer.loginChoice){
      case "Employee":
        console.log("xxxxxxxxxxxx \n under construction \n xxxxxxxxxxx".red);
        mainMenu();
        break;
      case "Customer":
        displayInventory();
        break;
    }
  })
}

// function customerPurchase(){
//   displayInventory().then(runCustInput());
// }
  
function runCustInput(){
  inquirer.prompt([
    {
      type: 'input',
      name: 'itemID',
      message: 'Enter the ItemID you would like to purchase:',
      validate: inputValid,
      filter: Number
    },{
      type: 'input',
      name: 'itemQ',
      message: 'Enter Quantity:',
      validate: inputValid,
      filter: Number
    }
  ]).then(function(input){
    var item = input.itemID;
    var quantity = input.itemQ;

    var orderSQL = 'SELECT * FROM products WHERE itemID='+item;
    // console.log(orderSQL.bgRed);

    connection.query(orderSQL, function(err, data){
      if (err) throw err;
      // console.log("Connected as id: " + connection.threadId);
    
      if(data.length === 0){
        console.log("Invalid Product ID.  Please reselect a valid item ID from the list provided".bgRed);
        displayInventory();
      } else {
        var inventoryData = data[0];
        // console.log(JSON.stringify(data,null,2));

        if (quantity <= inventoryData.stock_quant){
          console.log("Product in stock. Placing Order.".blue);
          var updateQrySQL = "UPDATE products SET stock_quant=" + (inventoryData.stock_quant - quantity) + " WHERE itemID=" + item;

          // Update Inventory
          connection.query(updateQrySQL, function(err,data){
            if (err) throw err;

            console.log("ORDER PLACED \n Your total charge is: \n $" + colors.green(quantity*inventoryData.sales_price))
            setTimeout(mainMenu, 2000);
          });
        } else {
          console.log("INSUFFICIENT INVENTORY".red);
          setTimeout(mainMenu, 2000);
        }
      }
    })
  })
}
