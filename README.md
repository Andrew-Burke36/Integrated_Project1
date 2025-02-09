# Acoustica
Our project Acoustica, aimed to provide high quality guitars to consumers who are looking to get started or may be looking for a new upgrade to their system. Our site provides and all in one stop to all guitar needs for acoustic and electric guitars! We offer in-house built guitars that we are developing to provide something new and authentic.

## Design Process

## Features

### Existing Features
1. Navigation bar
  - Allows incoming visitors to navigate around the site seamlessly with an overhead navigation bar that has access to the home page, shop page, about us page and contact us page.
2. Embedded sketchfab into website
  - Allows user to access and view our electric and acoustic guitar models that we have been developing behinds the scenes.
3. Form submission ( Contact us page ) 
  - Visitors who are curious about enquiring more information about products or any issue can go through the form submission to contact us with their problems.
4. Social media icons ( Footer ) 
  - Visitors who are curious about seeing our social media platforms can press on the instagram, twitter or tiktok icon will be redirected to our social media platform.
5. Shop cart overlay
  - Guests who are shopping will be able to click on the "Add to cart" button on their desired product, it will be added to their cart and can, one, see the quantity of items, change the quantity of items, see the product and can then checkout to the checkout page where they can handle their payment.
6. Filtering system
 - Guests who want to find a certain product such as electric guitars, can press on the "Electric" filtering button to filter for electric guitars, not necessarily by a specific model but available items in the catalogue to find a specific model.
7. Sign in/ Sign up
 - Guests can sign up with us on Acoustica by simple pressing on the 'Profile' icon in the top right to create an account, once they created an account, they will be asked to log in again. This allows users to track their order history, input their addresses or payment method for seamless payment in checkout.
8. Settings page for users
  - Customers who have signed up with us can access the "Settings page" by pressing on the profile icon that shows a dropdown linking them to a page where they can change their email and etc, addresses or payment information. As well as being able to track any existing orders, stating its status for "delivered", "processing" or "completed".
9. Checkout system
  - Users can checkout and pay for their items with us through the checkout page. Users can only checkout if they are signed up, in doing so provides them the ability to track orders seamlessly. Users will just need to enter in their credentials and payment option. While being shown their product information and price on the right hand side.
10. Dynamic loading
 - Most of the website is being handled dynamically by using an external database to load in products into the shop page based on available products. This also goes to the checkout system where the users product is dynamically loaded onto the information content for their products, with total price, taxes and etc. Moreover, users who purchase guitars will have dynamically loaded order history in their settings page. Lastly, users who have entered in their credentials into the settings page will have their information automatically loaded into the checkout page for a seamless transaction.
11. Saving system
 - Linking back from the settings page, users can change their details whenever they like to, allowing for a dynamic and immersive experience for users.

## Technologies Used
+ [Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
  - Bootstrap was used to help organise the front-end of the website alongside with its useful library of front-end elements to help create the navigation bar, product cards and etc.
+ [Isotope](https://isotope.metafizzy.co/)
  - Isotope was used to help do the filtering system for the website, that included a seamless animation when items are filtered.
+ [Formsubmit](https://formsubmit.co/)
  - Formsubmit was used to handle form submissions on the contact me page, so users inquiries will be sent to an external email.
+ [Restdb](https://restdb.io/)
  - Restdb was the main API used in this project to handle Get, Put, Post and Patch requests for dynamic loading in the website. Alongside being the database to store user contact information and order history.

## Assistive AI 
+ **Chatgpt**
  1. Chatgpt helped with developing the dynamic system, where i needed a way to inject content into a container. But I didn't know how to do that, chatgpt helped me in this regard. Chatgpt also helped with clarifying doubts I had about what certain syntax's did, also helping check for any errors in my code and what were some best practices I should do to ensure good code that was robust, such as suggesting wrapping my code in a eventlistener to wait for the dom to load before running the script. Alongside sometimes the implementation of the API wasn't working at times, so I had to ask chatgpt for help to check if there were syntax issues which sometimes there were. Lastly, coming from python, there were certain logic that I already knew but didnt know how to write it equivalently into javascript, hence chatgpt helped me with converting some of the python code into javascript so the logic will work.
![Chatgpthelp](Integrated_Project1/readme_img/Screenshot 2025-02-09 193546.png)
![Chatgpthelp](Integrated_Project1/readme_img/Screenshot 2025-02-09 194751.png)
![Chatgpthelp](Integrated_Project1/readme_img/Screenshot 2025-02-09 195026.png)

## Testing 