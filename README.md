# Bamazon
*Node.js &amp; MySQL Coding Bootcamp Project*

This project will require the user to run **npm install** to get the npm packages as indicated in the package.json.

##bamazonCustomer.JS

- Run the fine in the terminal using command **node bamazonCustomer.js** and follow the prompts

  - The Main Menu will prompt for Employee of Customer.  Select *Customer* and a list of items will be displayed.  
    ![Example Customer 1](/images/3.CustList.png)

    - Selecting Employee at this time will result in an error and rout you back to the Main Menu.
      ![Example Customer 2](/images/2.EmployeeError.png)
  
  - Once you enter the item id you want, you will be prompted for the quantity as well.  The system ensures the item is in stock or that the quantity requested is not greater than the quantity on hand.
  ![Example Customer 3](/images/4.QuantityOnHand.png)

  - The order is then placed and the total charge is given (quantity x unit price) and the user is then taken back to the main menu.
  ![Example Customer 4](/images/5.CompleteOrder.png)

  - If an order is placed for which there is insufficient inventory, an error message will be displayed and the user will be taken back to the main menu.
  ![Example Customer 5](/images/6.InvError.png)