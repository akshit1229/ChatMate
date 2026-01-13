# ChatMate

Welcome to **ChatMate**, a real-time chat application built using the MERN stack, Socket.io, and integrated with the GROQ model "llama-3.1-8b-instant" for AI-driven conversational experiences.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)



## Features

- **Real-Time Communication**: Utilizes Socket.io for instant messaging between users.
- **AI Chat Integration**: Incorporates the "llama-3.1-8b-instant" open source model from Groq.
- **User Authentication**: Secure user registration and login functionality.
- **Responsive Design**: Optimized for various devices, ensuring a seamless user experience across platforms.


## Technologies Used

- **Frontend**:
  - React.js
  - Socket.io-client
  - Tailwind CSS
  - DaisyUI
  - Zustand

- **Backend**:
  - Node.js
  - Express.js
  - Socket.io-server
  - MongoDB
  - JWT

- **AI Integration**:
  - Groq

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/NajimuddinS/ChatMate.git
   cd ChatMate
   ```

2. **Backend Setup**:

   ```bash
   cd Backend
   npm install
   ```

3. **Frontend Setup**:

   ```bash
   cd ../Frontend
   npm install
   ```

4. **Environment Variables**:

   Create a `.env` file in the `Backend` directory and add the following variables:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_cloud_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_cloud_api_secret
   GROQ_API_KEY=your_groq_api_key
   ```

5. **Run the Application**:

   - **Backend**:

     ```bash
     cd Backend
     npm run dev
     ```

   - **Frontend**:

     ```bash
     cd ../Frontend
     npm run dev
     ```



## Usage

- Register a new account or log in with existing credentials.
- Start a new chat or join existing conversations.
- Experience AI-assisted responses powered by the llama-3.1-8b-instant model.





