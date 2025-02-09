# Acoustica
Our project Acoustica, aimed to provide high quality guitars to consumers who are looking to get started or may be looking for a new upgrade to their system. Our site provides and all in one stop to all guitar needs for acoustic and electric guitars! We offer in-house built guitars that we are developing to provide something new and authentic.

## Design Process
**Design process**
- Designing the mainframe of the website took heavy inspiration from many ecommerce websites for general looks, due to good practices they ensure for proper UI/UX for the website, such as navigation and etc. We wanted the website to have a minamalist look, using white, black, lightyellow and darker shades of lightyellow for the color palette of the website. The website is focused to provide users a one stop for all guitars, with many products available for them, alongside an about me to share the story of Acoustica, and a way for users to contact us for more information about problems they may face. Nonetheless, this website is heavily targeted for guitar lovers who love music, ranging from beginners to passionate people. And hence, when users
come to Acoustica, they'll have access to many high quality guitars they can get to start their music journey or dive deeper to improving their equipment.

**User stories**
- User example 1
  - User that comes to our store is browsing for acoustic guitars, user can press on the shop navigation icon on the top, that'll link them to the shop page. After that, the user can press on "Acoustic" in the filtering system in the middle of the website to filter for acoustic guitars that they'll like to get.

- User example 2
  - User has been a customer of ours for a while, but recently has faced issues with their product/payment issue. They can go to the contact us page in the top right corner that'll link them to our form that they can submit to contact us, or whatsapp else call us on our hotline to enquire about how to resolve their isue.

**Wireframes and mockup**
[Wireframe link for website view](https://www.figma.com/design/faZuXtmTKFTb5SfgHUG1Dm/AD_Acoustica_Prototype?node-id=0-1&t=JrZQj3XxIdPxfckd-1)


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
+ [Normalize.css](https://necolas.github.io/normalize.css/)
  - Normalize.css makes browsers render all elements more consistently and in line with modern standards. It precisely targets only the styles that need normalizing.
+ [Fontawesome](https://fontawesome.com/)
  - Fontawesome helped provide icons like the user and cart icons for instance to provide more immersion for users that visit our site.



## Assistive AI 
+ **Chatgpt**
  1. Chatgpt helped with developing the dynamic system, where i needed a way to inject content into a container. But I didn't know how to do that, chatgpt helped me in this regard. Chatgpt also helped with clarifying doubts I had about what certain syntax's did, also helping check for any errors in my code and what were some best practices I should do to ensure good code that was robust, such as suggesting wrapping my code in a eventlistener to wait for the dom to load before running the script. Alongside sometimes the implementation of the API wasn't working at times, so I had to ask chatgpt for help to check if there were syntax issues which sometimes there were. Lastly, coming from python, there were certain logic that I already knew but didnt know how to write it equivalently into javascript, hence chatgpt helped me with converting some of the python code into javascript so the logic will work.

**Dynamic injection system**
![Chatgpthelp](https://github.com/Andrew-Burke36/Integrated_Project1/blob/main/readme_img/Screenshot%202025-02-09%20193546.png)

**Eventlistener for DOM Loading**
![Chatgpthelp](https://github.com/Andrew-Burke36/Integrated_Project1/blob/main/readme_img/Screenshot%202025-02-09%20194751.png)

**Equivalent python syntax for javascript**
![Chatgpthelp](https://github.com/Andrew-Burke36/Integrated_Project1/blob/main/readme_img/Screenshot%202025-02-09%20195026.png)

## Testing 
**Mobile View**
  - For users on mobile, the site will be previewed in a one column format with the navigation bar being turnt into a burger icon that will be dropdown when clicked.

![Mobile view](https://github.com/Andrew-Burke36/Integrated_Project1/blob/main/readme_img/Screenshot%202025-02-09%20205506.png)

**For other platforms**
  - For all other platforms not mobile, will be similar in terms of preview, being similar to a desktop format with the content being shown in two or more columns in different rows and etc. With adjusted font-size, width and height for all contents.

**Bugs not fixed**
1. Database cannot handle more than 1 item when purchased. Hence causing the database only able to store one item from a checkout cart of a few items.
2. When the script autoloads the user's information into the checkout, if the user hasn't updated their information to include payment method and etc, the script will fill it in with "undefined".

## Credits
**Media**
- Images provided for the products and other contents were copied from [Sweelee](https://www.sweelee.com.sg/), [The guitar shop](https://theguitarshop.sg/).
- Images provided for the about me were taken from [Breakthroughguitar](https://breakthroughguitar.com/statistics-on-the-best-guitars-for-beginners/) and [Adobe stock](https://stock.adobe.com/sg/images/Group-of-friends-with-guitar-having-fun-on-the-beach/224553730)

**Acknowledgements**
- Acoustica's front-end inspiration was taken heavily from [Sweelee](https://www.sweelee.com.sg/).

**Github link**
[Github link](https://github.com/Andrew-Burke36/Integrated_Project1)

**Contributions to Acoustica project**
1. Andrew John Burke
  - Main contributions to handle the backend system, using RestDB as the database and to use it to update the website dynamically. I helped do the front-end slightly when vonce could not do it at some part.
2. Vonce Chew
  - Main contributions was to do the front end, developing our mainframe and the UI/UX design, selecting the color palette for our website.