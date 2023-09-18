# CodSoft Internship Level 3 - Task 2 Project

Welcome to my GitHub repository for the CodSoft Internship Level 3 - Task 2 project! This project was a part of my remote internship at CodSoft, where I had the opportunity to learn and develop my skills in web development. In this task, I successfully built an e-commerce website that allows users to browse products, add items to a shopping cart, and proceed to checkout. The project involved implementing essential features such as user authentication, product filtering, and payment integration. 

## Project Description

The primary goal of this project was to create an e-commerce website using modern web technologies like React, Node.js, and MongoDB. Here's a brief overview of what I accomplished:

- **Frontend**: I developed the user interface using React, leveraging libraries like Material-UI to enhance the overall look and feel of the website. This also involved implementing features such as pagination, user authentication, and product filtering.

- **State Management**: I learned how to use Redux in React, allowing for efficient state management and data flow within the application. This included working with actions and reducers.

- **Input Validation**: To ensure the integrity of the data, I implemented input validation on both the frontend and backend. This was crucial for maintaining data accuracy and security.

- **Custom Hooks**: I discovered the importance of custom hooks in React, which helped me modularize and reuse code components effectively.

- **Clean Code**: Throughout this project, I prioritized clean code practices. This experience emphasized the importance of writing maintainable and readable code.

- **Backend**: I expanded my knowledge by working with Node.js, creating the backend for the application. This included setting up routes, handling authentication, and managing the database with MongoDB.

- **Payment Integration**: For seamless transactions, I integrated PayPal as the payment gateway. Users can now make payments easily by replacing the client ID in `index.html` with their PayPal account's client ID.

## Getting Started

To run this project locally, you'll need to create a `.env` file in the project directory and define the following environment variables:

- `CONNECTION_URL`: The MongoDB connection URL.
- `PORT`: The port number for your server.
- `SECRET_CODE`: A secret key for secure data handling.

Additionally, ensure you replace the following line in `index.html` with your PayPal client ID:

```html
<script src="https://www.paypal.com/sdk/js?client-id=?"></script>
```


## Conclusion
I am proud of what I've achieved during my CodSoft internship, It has equipped me with valuable skills and knowledge in web development, state management, and backend development. Feel free to explore this repository to see the code and functionalities I implemented.