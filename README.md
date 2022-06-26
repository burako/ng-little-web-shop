# NgLittleWebShop

This project is the front-end of an online store built with Angular. It allows following actions: 
    user can see all products on the main page
    user can select quantity for each product on the main page
    user is informed when products added to the cart
    user can add items to the cart on the main page
    user can select quantity for each product on the product detail page
    user can add items to the cart on the product detail page
    user can see items added to the cart in the cart page
    user can change quantity of the each product in the cart page
    if quantity of a product decreased to zero, it is removed from cart
    user can see the total price for all items in the cart
    users can enter payment information in the cart page
    users gets a confirmation of the order in the confirmation page
    cart is emptied after order is made
    cart badge in the header shows number of items in the cart

The app uses assets/data.json for product information.
Product and cart data operations are handled in product-data.service.

## Launching the app

Run npm install for installing all dependencies
Run `ng serve` and navigate to `http://localhost:4200/` to access the application

